const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

export const navItems = [
  { label: 'Home', target: 'home' },
  { label: 'Hazards', target: 'hazards' },
  { label: 'Preparedness', target: 'preparedness' },
  { label: 'Evacuation', target: 'evacuation' },
  { label: 'Hotlines', target: 'hotlines' },
];

export const hazards = [
  {
    title: 'Typhoon',
    localName: 'Bagyo',
    icon: asset('icons/cloud.svg'),
    description: 'Monitor PAGASA wind signals 1–5. Secure roofs, stock supplies, and stay indoors at Signal 3 or higher.',
  },
  {
    title: 'Flood',
    localName: 'Baha',
    icon: asset('icons/flood.svg'),
    description: 'Watch Marikina River alarm levels. Evacuate when instructed and never cross moving floodwater.',
  },
  {
    title: 'Earthquake',
    localName: 'Lindol',
    icon: asset('icons/earthquake.svg'),
    description: 'The West Valley Fault is nearby. Practice Duck, Cover, and Hold, and join community earthquake drills.',
  },
  {
    title: 'Fire',
    localName: 'Sunog',
    icon: asset('icons/fire.svg'),
    description: 'Install smoke alarms, know two exits, and keep your family’s evacuation path clear at all times.',
  },
];

export const preparednessSteps = [
  { number: '01', title: 'Know your risk', description: 'Identify the hazards in your barangay—flood-prone, near the fault, or in a fire-dense zone.' },
  { number: '02', title: 'Build a Go-Bag', description: 'Pack a three-day kit with water, food, medicine, documents, a flashlight, and cash for each person.' },
  { number: '03', title: 'Make a plan', description: 'Agree on a family meeting point, evacuation center, emergency contacts, and a route to safety.' },
  { number: '04', title: 'Stay informed', description: 'Follow Pasig DRRMO alerts, PAGASA advisories, and official Marikina River monitoring updates.' },
];

export const evacuationGroups = [
  {
    area: 'City evacuation centers',
    note: 'Confirm the active receiving center with your barangay or Pasig DRRMO before travelling.',
    centers: ['Pasig City Sports Center', 'Rizal High School', 'Pasig Elementary School', 'Barangay Covered Courts', 'De Castro Elementary School'],
  },
  { area: 'Ugong', centers: ['Ugong Barangay Hall Parking Lot'] },
  { area: 'Maybunga', centers: ['Maybunga Elementary School Annex', 'Westbank Community Center'] },
  { area: 'Sta. Lucia', centers: ['Sta. Lucia Bliss Multipurpose Hall'] },
];

export const hotlines = [
  { category: 'DRRMO Emergency', number: '8643-0000', href: 'tel:86430000', label: 'Pasig City DRRMO' },
  { category: 'Police', number: '8477-7953', href: 'tel:84777953', label: 'Philippine National Police' },
  { category: 'Fire Protection', number: '0932 779 8621', href: 'tel:09327798621', label: 'BFP – Pasig' },
  { category: 'Children’s Hospital', number: '8643-2222', href: 'tel:86432222', label: 'Pasig City Children’s Hospital' },
  { category: 'General Hospital', number: '8642-7379', secondaryNumber: '8642-7381', href: 'tel:86427379', secondaryHref: 'tel:86427381', label: 'Pasig City General Hospital' },
];
