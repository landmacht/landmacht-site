const test=require('node:test');const assert=require('node:assert/strict');const Module=require('node:module');const path=require('node:path');const crypto=require('node:crypto');
const site=path.resolve(__dirname,'..');const fs=require('node:fs');const ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename);
let delivered=0;let rejectDelivery=false;const messages=[];
const original=Module._load;Module._load=function(id,parent,isMain){if(id==='resend')return {Resend:class{emails={send:async(message)=>{messages.push(message);delivered++;return rejectDelivery?{error:{message:'Unavailable',statusCode:503},data:null}:{data:{id:'mock-email-'+delivered},error:null}}}}};if(id.startsWith('@/'))id=path.join(site,id.slice(2));return original.call(this,id,parent,isMain);};
const {POST}=require(site+'/app/api/quote/route.ts');const helper=require(site+'/src/lib/crm-intake.ts');
test('Landmacht form and durable delivery integration (no real emails)',async t=>{
 const store=new Map();let calls=0;let outage=false;
 process.env.RESEND_API_KEY='local-test-only';process.env.VANTORYN_CRM_API_URL='https://crm.example.test';process.env.CRM_INTAKE_SECRET='local-test-not-a-real-secret-123456';
 global.fetch=async(url,opts)=>{calls++;if(outage)throw new Error('Offline');
  assert.equal(new URL(url).hostname,'crm.example.test');const timestamp=opts.headers['x-crm-timestamp'];assert.equal(opts.headers['x-crm-signature'],'v1='+crypto.createHmac('sha256',process.env.CRM_INTAKE_SECRET).update(timestamp+'.'+opts.body).digest('hex'));
  const body=JSON.parse(opts.body);let entry=store.get(body.submission_id);let result;
  if(body.operation==='receive'){const hash=crypto.createHash('sha256').update(JSON.stringify(body.enquiry)).digest('hex');if(entry&&entry.hash!==hash)return new Response('{}',{status:409});if(!entry){entry={hash,primary:'pending',acknowledgement:'pending'};store.set(body.submission_id,entry);}result={accepted:true,payload_hash:entry.hash};}
  else if(body.operation==='claim'){const claimed=['pending','failed'].includes(entry[body.slot]);if(claimed)entry[body.slot]='sending';result={claimed,state:entry[body.slot]};}
  else {entry[body.slot]=body.state;result={state:body.state};}
  return Response.json({ok:true,data:result});
 };
 const body={submissionId:crypto.randomUUID(),sourcePage:'/contact',name:'Website QA',phone:'0123456789',email:'qa@example.test',area:'Paarl',service:'Guarding',guardsNeeded:'2',notes:'Local verification only'};
 const post=(value=body)=>POST(new Request('http://localhost/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value)}));
 await t.test('feature off preserves existing two-email form flow',async()=>{process.env.VANTORYN_CRM_ENABLED='false';assert.equal((await post()).status,200);assert.equal(delivered,2);assert.equal(calls,0);});
 await t.test('quote acknowledgement signature uses the sales address without changing general contacts or notification replies',()=>{
  const {CONTACT}=require(site+'/src/lib/contact.ts');
  assert.equal(CONTACT.EMAIL,'info@landmacht.co.za');
  assert.equal(messages[0].replyTo,body.email);
  assert.deepEqual(messages[0].to,['quotes@landmacht.co.za']);
  assert.deepEqual(messages[1].to,[body.email]);
  assert.equal(messages[1].from,'Landmacht Veiligheid <quotes@landmacht.co.za>');
  assert.match(messages[1].html,/href="mailto:quotes@landmacht\.co\.za"[^>]*>quotes@landmacht\.co\.za<\/a>/);
  assert.doesNotMatch(messages[1].html,/info@landmacht\.co\.za/);
 });
 await t.test('feature on records lead, retries do not duplicate either acknowledgement',async()=>{process.env.VANTORYN_CRM_ENABLED='true';assert.equal((await post()).status,200);assert.equal((await post()).status,200);assert.equal(store.size,1);assert.equal(delivered,4);});
 await t.test('changed retry and CRM outage send nothing and retain failure response',async()=>{assert.equal((await post({...body,notes:'Changed'})).status,503);outage=true;assert.equal((await post({...body,submissionId:crypto.randomUUID()})).status,503);outage=false;assert.equal(delivered,4);});
 await t.test('provider ambiguity is recorded; receipt remains successful and never auto-resends',async()=>{rejectDelivery=true;const next={...body,submissionId:crypto.randomUUID()};assert.equal((await post(next)).status,200);assert.equal(store.get(next.submissionId).primary,'unknown');const count=delivered;await post(next);assert.equal(delivered,count);rejectDelivery=false;});
 await t.test('oversized, malformed, invalid email and job-application sources rejected',async()=>{assert.equal((await post({...body,notes:'x'.repeat(17000)})).status,413);assert.equal((await post({...body,email:123})).status,400);assert.equal((await post({...body,email:'invalid@'})).status,400);assert.equal((await post({...body,sourcePage:'/careers'})).status,503);});
});
