// Site-wide settings, navigation and contact details.
export const site = {
  name: 'Yondr',
  tagline: 'Creating Phone-Free Spaces Worldwide',
  description:
    'Yondr creates phone-free spaces for schools, live events and workplaces with lockable phone pouches that help people focus, connect and be present.',
  url: 'https://www.overyondr.com',
  email: 'team@overyondr.com',
  pressEmail: 'press@overyondr.com',
  linkedin: 'https://www.linkedin.com/company/overyondr/',
  careers: 'https://jobs.ashbyhq.com/yondr',
  locations: ['California', 'New York', 'Minnesota', 'London', 'Sydney'],
};

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const spacesNav: NavLink[] = [
  {
    label: 'Education',
    href: '/spaces/education',
    description: 'Focused classrooms and connected school days',
  },
  {
    label: 'Live Events',
    href: '/spaces/live-events',
    description: 'Concerts, comedy and shows without the screens',
  },
  {
    label: 'Commercial',
    href: '/spaces/commercial',
    description: 'Confidential, focused workplaces and courts',
  },
];

export const mainNav: (NavLink & { children?: NavLink[] })[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Find Your Space', href: '/find-your-space', children: spacesNav },
  { label: 'About', href: '/about' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'The Program',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Find Your Space', href: '/find-your-space' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'School Phone Bans', href: '/school-phone-bans' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/timeline' },
      { label: 'Careers', href: site.careers },
      { label: 'Contact Us', href: '/get-started' },
    ],
  },
];
