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
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'The Program',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Find Your Space', href: '/find-your-space' },
      { label: 'Products', href: '/products' },
      { label: 'Yondr Home Tray', href: '/home-tray' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'School Phone Bans', href: '/school-phone-bans' },
      { label: 'Funding Guide', href: '/funding' },
      { label: 'UK Schools', href: '/uk-schools' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/timeline' },
      { label: 'Yondr International', href: '/international' },
      { label: 'Careers', href: site.careers },
      { label: 'Contact Us', href: '/get-started' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Patents', href: '/patents' },
  { label: 'Modern Slavery Statement', href: '/modern-slavery-statement' },
];
