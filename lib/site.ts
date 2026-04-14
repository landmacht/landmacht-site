export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  outcomes: string[];
  whatWeDo: string[];
  deployment: string;
  faq: { q: string; a: string }[];
};

export const siteConfig = {
  name: 'Landmacht Veiligheid',
  description:
    'Landmacht Veiligheid provides disciplined private security services across Franschhoek, Paarl, and Wellington with operational oversight. Contact info@landmacht.co.za or +27 78 620 8404.',
  phone: '+27 78 620 8404',
  email: 'info@landmacht.co.za',
  whatsapp: '27786208404',
  whatsappUrl: 'https://wa.me/27786208404?text=Hi%20Landmacht%20Veiligheid%2C%20I%20would%20like%20assistance.',
  areas: ['Franschhoek', 'Paarl', 'Wellington'],
  logo: '/images/landmacht-logo.png'
};

export const trustItems = [
  'PSIRA Registered',
  'Estate Specialists',
  'Deployment-Ready Officers',
  '24/7 Operational Oversight',
  'Western Cape Coverage'
];

export const packageCards = [
  {
    name: 'Package A',
    officers: '1 officer',
    price: 'From R19,500 / month excl. VAT'
  },
  {
    name: 'Package B',
    officers: '2 officers',
    price: 'From R39,000 / month excl. VAT'
  },
  {
    name: 'Package C',
    officers: '3 officers',
    price: 'From R57,000 / month excl. VAT',
    note: 'Save R1,500 with multi-officer deployment'
  }
];

export const packageAddOns = [
  'Supervisor audits',
  'Risk assessments',
  'Vehicle/patrol support'
];

export const services: ServiceItem[] = [
  {
    slug: 'estate-security',
    title: 'Estate Security',
    summary: 'Controlled access, visible guarding, and routine reporting for residential estates.',
    image: '/images/service-estate.jpg',
    outcomes: ['Reduced unauthorized access', 'Orderly visitor flow at gates', 'Reliable daily incident logs'],
    whatWeDo: [
      'Gatehouse staffing with disciplined visitor verification',
      'Resident and contractor access support with clear protocols',
      'Routine perimeter and common-area patrols',
      'Shift handovers and incident updates to management'
    ],
    deployment:
      'A typical estate deployment includes one or more officers at access points, scheduled patrol circuits, visitor logging discipline, and supervisor spot-checks across peak hours.',
    faq: [
      {
        q: 'Do you manage both day and night shifts?',
        a: 'Yes. We structure shifts around site risk patterns and can provide 24/7 deployment when required.'
      },
      {
        q: 'Can your team work with existing estate rules?',
        a: 'Yes. We align post orders to the estate conduct policy and update routines in consultation with management.'
      },
      {
        q: 'How is visitor logging handled?',
        a: 'Officers follow a controlled check-in process and maintain consistent records for accountability.'
      },
      {
        q: 'Do we get incident feedback?',
        a: 'Yes. We provide incident and shift summaries to support oversight and decisions.'
      }
    ]
  },
  {
    slug: 'farm-rural-security',
    title: 'Farm & Rural Security',
    summary: 'Perimeter awareness and access-point discipline for large rural properties.',
    image: '/images/service-farm.jpg',
    outcomes: ['Improved perimeter awareness', 'Stronger access-point control', 'Practical night deterrence routines'],
    whatWeDo: [
      'Access-point observation and visitor screening',
      'Structured perimeter and boundary checks',
      'Night-time deterrence routines with reporting',
      'Coordination with owners or farm managers on incidents'
    ],
    deployment:
      'Farm deployments focus on defined entry routes, patrol timing for vulnerable zones, and immediate escalation to designated client contacts when irregular activity is identified.',
    faq: [
      {
        q: 'Can you cover remote areas on the property?',
        a: 'Yes. We map patrol zones and set practical check intervals based on terrain and access patterns.'
      },
      {
        q: 'Is this suitable for seasonal activity changes?',
        a: 'Yes. We can adjust manpower and routines around harvesting, deliveries, or increased worker movement.'
      },
      {
        q: 'Do you support owner-managed farms?',
        a: 'Yes. We work directly with owner-managers and provide concise updates on key events.'
      },
      {
        q: 'How fast are incidents escalated?',
        a: 'Escalation follows pre-agreed contact trees and procedures set during onboarding.'
      }
    ]
  },
  {
    slug: 'commercial-security',
    title: 'Commercial Security',
    summary: 'Operational guarding for business premises, warehouses, and office environments.',
    image: '/images/service-commercial.jpg',
    outcomes: ['Consistent access discipline', 'Visible after-hours presence', 'Reduced avoidable security lapses'],
    whatWeDo: [
      'Entry and exit monitoring for staff and visitors',
      'Reception and delivery-point observation support',
      'After-hours interior and perimeter patrols',
      'Incident logging and escalation to management contacts'
    ],
    deployment:
      'Commercial deployments blend front-of-house control with after-hours patrol coverage, aligned to opening times, delivery windows, and known risk periods.',
    faq: [
      {
        q: 'Do you support office and warehouse sites?',
        a: 'Yes. Deployment plans are tailored to property layout, traffic flow, and operating hours.'
      },
      {
        q: 'Can you coordinate with site managers?',
        a: 'Yes. We maintain a clear communication channel for incidents, schedule changes, and daily priorities.'
      },
      {
        q: 'What reporting do clients receive?',
        a: 'Clients receive practical summaries focused on incidents, patrol completion, and risk observations.'
      },
      {
        q: 'Can services scale with business growth?',
        a: 'Yes. Staffing levels and post orders can be adjusted as operational needs evolve.'
      }
    ]
  },
  {
    slug: 'access-control',
    title: 'Access Control',
    summary: 'Disciplined screening and entry-point management for sites requiring controlled movement.',
    image: '/images/service-access-control.jpg',
    outcomes: ['Tighter entry-point accountability', 'Cleaner visitor records', 'Fewer unauthorized entries'],
    whatWeDo: [
      'Visitor verification and check-in control',
      'Contractor and delivery access procedures',
      'Vehicle access checks at designated points',
      'Clear escalation on non-compliant access attempts'
    ],
    deployment:
      'Access control deployments are structured around high-traffic time blocks, ensuring every entry point follows the same process and reporting standard.',
    faq: [
      {
        q: 'Do you integrate with existing visitor systems?',
        a: 'Yes. We can work with manual or digital systems already used on site.'
      },
      {
        q: 'Can you handle contractor waves?',
        a: 'Yes. We apply queue management and identity checks to keep movement controlled.'
      },
      {
        q: 'What happens during attempted non-compliant entry?',
        a: 'Officers follow escalation procedures and contact designated site representatives immediately.'
      },
      {
        q: 'Is reporting detailed enough for audits?',
        a: 'Yes. Logs focus on entries, incidents, and exceptions for management review.'
      }
    ]
  },
  {
    slug: 'event-security',
    title: 'Event Security',
    summary: 'Structured crowd movement and access-point security for private and corporate events.',
    image: '/images/service-events.jpg',
    outcomes: ['Controlled guest entry', 'Calmer crowd flow', 'Immediate on-site response to incidents'],
    whatWeDo: [
      'Entry-point staffing and guest verification',
      'Perimeter and venue observation during live events',
      'Back-of-house access control for service providers',
      'Incident communication with event coordinators'
    ],
    deployment:
      'Event deployments begin with site briefing and zoning, then move into managed access, active floor coverage, and post-event incident closeout reporting.',
    faq: [
      {
        q: 'Can you handle single-day and multi-day events?',
        a: 'Yes. We can deploy according to event duration and attendance profile.'
      },
      {
        q: 'Do you coordinate with planners and venue teams?',
        a: 'Yes. We align roles and escalation contacts before doors open.'
      },
      {
        q: 'Can you manage VIP entry points?',
        a: 'Yes. We can assign dedicated access control where required by the event plan.'
      },
      {
        q: 'How early should we book event security?',
        a: 'For best planning quality, we recommend early engagement so post orders can be finalized in time.'
      }
    ]
  },
  {
    slug: 'risk-assessments',
    title: 'Risk Assessments',
    summary: 'Site-level security assessments that identify vulnerabilities and practical controls.',
    image: '/images/service-risk.jpg',
    outcomes: ['Clear view of site vulnerabilities', 'Actionable mitigation priorities', 'Better-informed staffing plans'],
    whatWeDo: [
      'On-site walkthrough of access, perimeter, and routines',
      'Identification of control gaps and process weaknesses',
      'Prioritized recommendations with realistic timelines',
      'Follow-up review options after implementation'
    ],
    deployment:
      'Assessments include a structured site review, stakeholder input, documented findings, and practical recommendations tied to budget and operational realities.',
    faq: [
      {
        q: 'What does a risk assessment deliverable include?',
        a: 'A practical findings summary with prioritized actions based on observed vulnerabilities.'
      },
      {
        q: 'Can assessments be done before staffing starts?',
        a: 'Yes. Many clients use assessments first to define the right deployment model.'
      },
      {
        q: 'Do you revisit sites after changes are made?',
        a: 'Yes. Follow-up reviews can confirm whether controls are working as intended.'
      },
      {
        q: 'Is this useful for smaller properties?',
        a: 'Yes. Smaller sites still benefit from structured risk visibility and clear control measures.'
      }
    ]
  }
];

export const homeFaq = [
  {
    q: 'How quickly can deployment start?',
    a: 'After scope confirmation and site onboarding, deployment timelines are agreed per site complexity and staffing requirements.'
  },
  {
    q: 'Do you offer 24/7 security options?',
    a: 'Yes. We offer shift-based options that can cover full-day operational requirements.'
  },
  {
    q: 'What locations do you cover?',
    a: 'Core coverage includes Franschhoek, Paarl, and Wellington, with surrounding Western Cape areas considered on request.'
  },
  {
    q: 'How does reporting work?',
    a: 'Clients receive structured incident and operational updates to maintain visibility of site activity.'
  },
  {
    q: 'What is the pricing starting point?',
    a: 'Packages start from R19,500 per officer / month (excl. VAT). VAT charged at the prevailing rate.'
  }
];

export const deploymentExamples = [
  {
    title: 'Estate',
    description: 'Gate access, visitor logging, visible presence, and daily reporting to estate management.'
  },
  {
    title: 'Farm & Rural',
    description: 'Perimeter checks, access-point monitoring, night deterrence routines, and incident reporting.'
  },
  {
    title: 'Commercial',
    description: 'Access control, after-hours patrols, and loss-prevention basics tailored to the site.'
  }
];

export const areaContent = [
  {
    area: 'Franschhoek',
    image: '/images/areas-franschhoek.jpg',
    text:
      'Franschhoek properties often need structured estate and hospitality-adjacent security. We provide disciplined access control, visible guarding, and practical reporting for residential and business sites.',
    recommended: ['Estate Security', 'Access Control', 'Event Security']
  },
  {
    area: 'Paarl',
    image: '/images/areas-paarl.jpg',
    text:
      'In Paarl, our teams support commercial facilities, estates, and mixed-use sites with reliable shift coverage, patrol routines, and operational communication to management.',
    recommended: ['Commercial Security', 'Estate Security', 'Risk Assessments']
  },
  {
    area: 'Wellington',
    image: '/images/areas-wellington.jpg',
    text:
      'Wellington deployments commonly include farm and rural environments requiring perimeter awareness, controlled access points, and clear escalation procedures.',
    recommended: ['Farm & Rural Security', 'Access Control', 'Risk Assessments']
  }
];

