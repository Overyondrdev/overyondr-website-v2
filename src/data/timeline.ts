// Timeline milestones. Yondr entries are sourced from press coverage in src/data/press.ts and the blog.
export interface Milestone {
  year: string;
  title: string;
  text: string;
  image?: string;
  alt?: string;
  kind: 'history' | 'yondr';
  source?: string;
}

export const milestones: Milestone[] = [
  {
    year: '1876',
    title: 'The first telephone',
    text: 'Alexander Graham Bell patents the telephone, and conversation stops depending on being in the same room.',
    image: 'hero-timeline.jpg',
    alt: 'An archival photograph of men gathered around an early telephone',
    kind: 'history',
  },
  {
    year: '1973',
    title: 'The first mobile call',
    text: 'Martin Cooper places the first handheld cellular phone call on a Manhattan street. The phone leaves the wall.',
    image: 'tl-green-phone.jpg',
    alt: 'A hand holding a green telephone receiver',
    kind: 'history',
  },
  {
    year: '1990s',
    title: 'A phone in every pocket',
    text: 'Affordable handsets and text messaging make the mobile phone a personal, always-on device.',
    image: 'tl-nokias.jpg',
    alt: 'Rows of 1990s mobile phones',
    kind: 'history',
  },
  {
    year: '2007',
    title: 'The smartphone arrives',
    text: 'Touchscreen smartphones put the internet, the camera and the feed in the same pocket. Attention becomes the product.',
    image: 'tl-silhouette.jpg',
    alt: 'A silhouetted person lit by the glow of a phone screen',
    kind: 'history',
  },
  {
    year: '2014',
    title: 'Yondr is founded',
    text: 'In San Francisco, Graham Dugoni sews the first pouch prototypes by hand and pitches phone-free spaces to Bay Area schools and venues from his camper van.',
    image: 'hero-about.jpg',
    alt: 'Hands unlocking a Yondr pouch',
    kind: 'yondr',
  },
  {
    year: '2015',
    title: '25,000 phones locked',
    text: 'Artists and comedians embrace phone-free shows, and Yondr locks 25,000 phones in its first full year.',
    image: 'band-stage.jpg',
    alt: 'A band performing on stage',
    kind: 'yondr',
    source: 'The Wall Street Journal',
  },
  {
    year: '2018',
    title: '600 schools and counting',
    text: 'Schools discover what venues already knew. The Washington Post reports Yondr is used in more than 600 schools.',
    image: 'classroom-students.jpg',
    alt: 'Students in a classroom',
    kind: 'yondr',
    source: 'The Washington Post',
  },
  {
    year: '2022',
    title: 'Broadway goes phone-free',
    text: 'Productions and festivals turn to Yondr to protect performers and keep audiences in the moment.',
    image: 'comedian.jpg',
    alt: 'A performer on stage with a microphone',
    kind: 'yondr',
    source: 'The New York Times',
  },
  {
    year: '2024',
    title: 'One of TIME’s Best Inventions',
    text: 'Yondr is named to TIME’s list of the Best Inventions of 2024, as more than 10 million people are expected to use a pouch that year.',
    image: 'pouch-hands-2.jpg',
    alt: 'Hands holding a Yondr pouch',
    kind: 'yondr',
    source: 'TIME / The Wall Street Journal',
  },
  {
    year: '2025',
    title: 'States go bell-to-bell',
    text: 'Statewide school phone bans spread across the U.S. At least 2.5 million students now use Yondr pouches, including in roughly 800 New York City schools.',
    image: 'stairs.jpg',
    alt: 'Students on a school staircase',
    kind: 'yondr',
    source: 'CBS News / Spectrum News NY1',
  },
  {
    year: '2026',
    title: 'The research is in',
    text: 'The largest national study to date links Yondr phone-free schools to gains in student well-being, and phone-free bars and restaurants open across the country.',
    image: 'friends-bar.jpg',
    alt: 'Friends laughing together in a bar',
    kind: 'yondr',
    source: 'NBER / Axios',
  },
];
