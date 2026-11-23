// Content for the three "Space" pages, which share one template (src/pages/spaces/[space].astro).
// Copy comes from the V3 prototype; where the prototype had placeholder (lorem) text it has been
// replaced with plain descriptions of how the program works, and testimonials use real, attributed
// press quotes (see src/data/press.ts) rather than invented ones.
import type { Stat } from '../components/StatsBar.astro';

export interface Step {
  title: string;
  text: string;
  image: string;
  alt: string;
}
export interface Benefit {
  title: string;
  text: string;
  image: string;
  alt: string;
}
export interface Quote {
  quote: string;
  name: string;
  role: string;
  image?: string;
  url?: string;
}
export interface Resource {
  title: string;
  text: string;
  href: string;
  icon: 'download' | 'external' | 'arrow-right';
}

export interface Space {
  slug: 'education' | 'live-events' | 'commercial';
  name: string;
  card: { title: string; text: string; cta: string; image: string; alt: string };
  seo: { title: string; description: string };
  hero: { title: string; intro: string; body: string; image: string; alt: string; position?: string };
  stats: Stat[];
  processIntro: string;
  steps: Step[];
  feature: { lead: string; rest: string; text: string; image: string; alt: string };
  benefits: { title: string; text: string; items: Benefit[] };
  stories: { title: string; text: string; quotes: Quote[] };
  movement?: { title: string; text: string; cta: { label: string; href: string } };
  resources: {
    title: string;
    text: string;
    items: Resource[];
    feature: { title: string; text: string; image: string; href: string; cta: string };
  };
}

export const spaces: Space[] = [
  {
    slug: 'education',
    name: 'Education',
    card: {
      title: 'Off To Learn',
      text: 'Create calmer, more engaged learning environments. Our phone-free program is designed to help students experience the focus, creativity, and relief that comes with a phone-free school day.',
      cta: 'Yondr For Education',
      image: 'library-reading.jpg',
      alt: 'A student lying on a library floor reading a book',
    },
    seo: {
      title: 'Phone-Free Schools',
      description:
        'Yondr helps schools create phone-free classrooms with lockable pouches students keep with them, so focus, connection and learning come first.',
    },
    hero: {
      title: 'Off To Learn',
      intro: 'Supporting distraction-free learning to help students succeed.',
      body: 'With Yondr, you’ll gain the tools to create classrooms where focus comes naturally. Putting down devices and picking up schoolwork, our secure phone storage systems ensure academic growth remains the top priority.',
      image: 'hero-education.jpg',
      alt: 'A row of colourful school lockers',
    },
    stats: [
      { value: 2.5, decimals: 1, suffix: 'M+', label: 'Students supported daily' },
      { value: 84, suffix: '%', label: 'More engaged students' },
      { value: 180, label: 'Hours of reclaimed instruction' },
      { value: 80, display: '50–80%', label: 'Decline in cyberbullying' },
    ],
    processIntro:
      'A simple daily routine that takes seconds, keeps phones with their owners, and gives teachers back the classroom.',
    steps: [
      {
        title: 'Arrive and secure',
        text: 'Students place their phones in a Yondr pouch as they arrive and close it with a single push. No collection bins, no confiscation.',
        image: 'pouch-hands.jpg',
        alt: 'A student holding a Yondr pouch with a phone inside',
      },
      {
        title: 'Keep it with you',
        text: 'Each student keeps their own locked pouch in a bag or pocket all day, so phones stay safe and close by.',
        image: 'backpack-brick.jpg',
        alt: 'A backpack with a Yondr pouch clipped to it',
      },
      {
        title: 'Learn without the pull',
        text: 'With notifications out of reach, classrooms get quieter, conversations get longer and attention returns to the lesson.',
        image: 'classroom-table.jpg',
        alt: 'Students working together at a classroom table',
      },
      {
        title: 'Unlock at the bell',
        text: 'At the end of the day, students tap their pouch on an unlocking base on the way out and they’re free to use their phones again.',
        image: 'pouch-desk.jpg',
        alt: 'A Yondr pouch resting on a school desk',
      },
    ],
    feature: {
      lead: 'Built For',
      rest: 'Better Learning',
      text: 'Our phone pouch program is a fast and easy-to-implement method for managing academic cell phone use. Available across a range of applications, we help educators lead students to better choices throughout their learning experiences.',
      image: 'hallway-lockers.jpg',
      alt: 'Students walking down a school hallway lined with lockers',
    },
    benefits: {
      title: 'Less Distraction. More Growth.',
      text: 'When you turn off devices, you unlock new opportunities. Explore what’s possible with phone-free spaces for education.',
      items: [
        {
          title: 'Healthier for students',
          text: 'Encourage real-world engagement over digital distraction. Promote a safer school experience focused on education. Lower social media-related stress, and prevent cyberbullying and online harm.',
          image: 'backpack-brick.jpg',
          alt: 'Two students sitting by a brick wall with Yondr pouches',
        },
        {
          title: 'Easier classroom management',
          text: 'Teachers stop policing phones. The pouch does the enforcing, so lessons start on time and stay on track.',
          image: 'classroom-students.jpg',
          alt: 'A full classroom of students facing their teacher',
        },
        {
          title: 'Stronger academic integrity',
          text: 'With phones locked away during class and exams, students show what they actually know.',
          image: 'writing-notebook.jpg',
          alt: 'A student writing by hand in a notebook',
        },
      ],
    },
    stories: {
      title: 'Real Classrooms. Real Stories.',
      text: 'Millions of students use Yondr every day. Here’s what educators and reporters are seeing in phone-free schools.',
      quotes: [
        {
          quote:
            'No phones means we minimise the risk of cyber-bullying or breaches of child protection during the school day.',
          name: 'Siobhán Foster',
          role: 'De La Salle College, Ireland',
          image: 'educators-pouch.jpg',
        },
        {
          quote: 'The results for us were just a game-changer.',
          name: 'Patricia Shipe',
          role: 'President, Akron Education Association, via Vox',
          url: 'https://www.vox.com/24105235/phones-kids-schools-ban-yondr-pouch-smartphones',
        },
        {
          quote: 'At last this has been taken seriously. Thank you.',
          name: 'Students at Ashford School',
          role: 'As reported by the BBC',
          url: 'https://www.bbc.com/news/uk-england-kent-67641448',
        },
        {
          quote:
            'Our whole perspective is that it’s not taking something away from students, it’s giving them something back.',
          name: 'Graham Dugoni',
          role: 'Founder & CEO, Yondr, to CBS News',
          url: 'https://www.cbsnews.com/news/yondr-pouches-school-cell-phone-ban/',
        },
      ],
    },
    movement: {
      title: 'Leading The Way',
      text: 'A movement is starting. More and more districts are shifting away from cell phones and towards Yondr.',
      cta: { label: 'School Phone Bans', href: '/school-phone-bans' },
    },
    resources: {
      title: 'Unlock What’s Possible',
      text: 'Need help affording a phone-free program at your school? Our funding guide walks you through implementing Yondr using federal, state, and local funding.',
      items: [
        {
          title: 'Funding Guide',
          text: 'Step-by-step help paying for a phone-free program.',
          href: '/funding',
          icon: 'download',
        },
        {
          title: 'School Phone Bans',
          text: 'Where every state stands on phones in schools.',
          href: '/school-phone-bans',
          icon: 'arrow-right',
        },
        {
          title: 'The Research',
          text: 'What new studies show about phone-free schools.',
          href: '/blog/nber-research-yondr-phone-free-schools-outcomes',
          icon: 'arrow-right',
        },
        {
          title: 'Education FAQ',
          text: 'Medical needs, emergencies, and more.',
          href: '/faq#education',
          icon: 'arrow-right',
        },
      ],
      feature: {
        title: 'Talk To Our Education Team',
        text: 'Get a plan for your school or district, from first pilot to full rollout.',
        image: 'teacher-students.jpg',
        href: '/get-started?space=education',
        cta: 'Get Started',
      },
    },
  },
  {
    slug: 'live-events',
    name: 'Live Events',
    card: {
      title: 'Off To Experience',
      text: 'Phone-free shows let audiences be fully present and performers be fully free. Yondr is trusted by artists, comedians and venues to create experiences people never forget.',
      cta: 'Yondr For Live Events',
      image: 'band-stage.jpg',
      alt: 'A band performing on a small stage',
    },
    seo: {
      title: 'Phone-Free Live Events',
      description:
        'Phone-free concerts, comedy and events with Yondr. Protect your performance, prevent leaks and give audiences a show they’ll actually remember.',
    },
    hero: {
      title: 'Off To Experience',
      intro: 'Protecting live moments from unwanted interruption.',
      body: 'There’s something magical about live events. The shared sense of connection. That feeling in the air. It’s a once-in-a-lifetime moment. Yondr gives you the security you need to preserve that excitement. No unwanted recordings. No audience distraction. Just the memories everyone gathered to make.',
      image: 'hero-live.jpg',
      alt: 'Friends around a bar table with a Yondr pouch beside their drinks',
    },
    stats: [
      { value: 20, suffix: 'M+', label: 'People have experienced a Yondr show' },
      { value: 40, label: 'Major arenas in Europe and USA' },
      { value: 55, label: 'Countries' },
      { value: 12, label: 'Years pioneering phone-free spaces' },
    ],
    processIntro: 'Fast at the door, invisible during the show, and quick on the way out.',
    steps: [
      {
        title: 'Pouch at the door',
        text: 'Staff hand each guest a pouch at entry. Phones go in and lock with one push, adding just seconds to the line.',
        image: 'cocktail-pouch.jpg',
        alt: 'A guest with a Yondr pouch at a bar',
      },
      {
        title: 'Keep it with you',
        text: 'Guests hold on to their own phone the whole time. Nothing is collected or stored.',
        image: 'man-laughing.jpg',
        alt: 'A man laughing during a night out',
      },
      {
        title: 'Phone Use Areas',
        text: 'Need to check in? Step into a designated Phone Use Area, unlock, and lock up again before heading back in.',
        image: 'bar-friends.jpg',
        alt: 'Friends laughing together at a table',
      },
      {
        title: 'Unlock on the way out',
        text: 'Unlocking bases at the exits open pouches in a second, and staff collect them as guests leave.',
        image: 'band-stage.jpg',
        alt: 'A guitarist and drummer performing on stage',
      },
    ],
    feature: {
      lead: 'Making',
      rest: 'Memories Count',
      text: 'Whether it’s a headline tour or heartfelt talk, our lockable phone pouches give venues the confidence they need to host live events centered on interaction.',
      image: 'bar-friends.jpg',
      alt: 'Friends laughing around a table at a phone-free bar',
    },
    benefits: {
      title: 'Live In The Moment',
      text: 'When you set down cell phones, you open up space to celebrate. Step into something new with device-free spaces for live events.',
      items: [
        {
          title: 'Privacy protected',
          text: 'With Yondr’s secure smartphone storage, there’s no need to worry about unwanted recordings or content leaks. Keep experiences unique, let “you had to be there” moments shine, and create a safe space for performers.',
          image: 'cocktail-pouch.jpg',
          alt: 'A bartender serving a drink next to a Yondr pouch',
        },
        {
          title: 'Devices managed without delay',
          text: 'Pouching takes seconds per guest and unlocking takes even less, with trained staff and clear signage at every entrance.',
          image: 'party-dance.jpg',
          alt: 'Two women dancing at a party',
        },
        {
          title: 'Performances uninterrupted',
          text: 'No glowing screens, no flashes, no heckles from the internet. Just a room fully tuned in to the stage.',
          image: 'comedian.jpg',
          alt: 'A comedian performing with a microphone',
        },
      ],
    },
    stories: {
      title: 'Real Experiences Enjoyed',
      text: 'Major performers count on Yondr to bring their events to life. Here’s what audiences and the press say about going phone-free.',
      quotes: [
        {
          quote:
            'It’s not just about not having your phone… it’s actually about what happens to everybody when everyone is truly there with the people in the room and not somewhere else.',
          name: 'The Washington Post',
          role: 'On the magic of a phone-free party',
          image: 'party-dance.jpg',
          url: 'https://wapo.st/4iwcmM2',
        },
        {
          quote:
            'A phone-free bar brought me an experience I rarely have, total disconnection… I walked away feeling more connected than ever.',
          name: 'A patron in Charlotte',
          role: 'As told to Axios',
          image: 'bar-lamp.jpg',
          url: 'https://www.axios.com/2026/04/05/phone-free-restaurants-bars-bans-restrictions-offline',
        },
        {
          quote:
            'Once you’ve been at a show where no one is holding up a screen, you understand what’s been missing.',
          name: 'Graham Dugoni',
          role: 'Founder & CEO, Yondr, to CNN',
          image: 'hero-blog.jpg',
          url: 'https://www.cnn.com/world/no-phones-concert-crowds-harry-styles-spc',
        },
      ],
    },
    resources: {
      title: 'Resources For Live Events',
      text: 'Need help making your phone-free event a reality? We’re here to help make the transition as easy as singing along to your favorite song.',
      items: [
        {
          title: 'How Phone-Free Events Work',
          text: 'Concerts, comedy, weddings and launches.',
          href: '/blog/how-phone-free-events-work-concerts-comedy-weddings-and-launches',
          icon: 'arrow-right',
        },
        {
          title: 'Phone-Free Concerts',
          text: 'Options for venues and tours in 2026.',
          href: '/blog/best-phone-free-solutions-for-concerts-2026',
          icon: 'arrow-right',
        },
        {
          title: 'Live Events FAQ',
          text: 'Tickets, emergencies, Phone Use Areas.',
          href: '/faq#live-events',
          icon: 'arrow-right',
        },
        {
          title: 'Press Coverage',
          text: 'Phone-free shows in the news.',
          href: '/press',
          icon: 'arrow-right',
        },
      ],
      feature: {
        title: 'Plan Your Phone-Free Show',
        text: 'Tours, residencies, one-off events and private parties.',
        image: 'street-friends.jpg',
        href: '/get-started?space=live-events',
        cta: 'Get Started',
      },
    },
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    card: {
      title: 'Off To Work',
      text: 'Keep workplaces, courthouses and productions focused and confidential. Our secure phone storage helps teams protect sensitive information and do their best work.',
      cta: 'Yondr For Work',
      image: 'desk-hands.jpg',
      alt: 'Hands working over papers on a desk',
    },
    seo: {
      title: 'Phone-Free Workplaces & Courts',
      description:
        'Yondr secures phones in workplaces, courthouses and productions to protect confidential information, prevent recording and improve focus.',
    },
    hero: {
      title: 'Off To Work',
      intro: 'Keeping workplaces focused, confidential, and operating at their fullest potential.',
      body: 'Your workspace sets the mood for your productivity. With Yondr, on-site distractions are a thing of the past. Securely store phones, increase employee efficiency, and establish a space where successful ideas thrive.',
      image: 'hero-commercial.jpg',
      alt: 'A team meeting around a dark table with notebooks and glasses',
    },
    stats: [
      { value: 1, suffix: 'M', label: 'Court visitors served annually' },
      { value: 80, suffix: '+', label: 'Jurisdictions' },
      { value: 55, label: 'Countries' },
      { value: 12, label: 'Years pioneering phone-free spaces' },
    ],
    processIntro: 'Secure devices at the entrance and keep sensitive spaces sensitive.',
    steps: [
      {
        title: 'Secure at entry',
        text: 'Employees, visitors or jurors lock their phones in a pouch at the door or at security screening.',
        image: 'desk-hands.jpg',
        alt: 'A person signing paperwork at a desk',
      },
      {
        title: 'Phones stay with people',
        text: 'Nobody hands their device to a stranger. People keep their own phone, locked, for the duration.',
        image: 'office-suits.jpg',
        alt: 'Two colleagues in suits reviewing documents',
      },
      {
        title: 'Focus and confidentiality',
        text: 'No cameras or recorders in the room means candid conversations and protected information.',
        image: 'office-women.jpg',
        alt: 'Colleagues talking in an office kitchen',
      },
      {
        title: 'Unlock when you leave',
        text: 'Pouches open at unlocking stations on the way out, so the process adds almost no time to the day.',
        image: 'office-printer.jpg',
        alt: 'A person using an office printer',
      },
    ],
    feature: {
      lead: 'Made To Work',
      rest: 'With You',
      text: 'Our magnetic phone pouches are an easy-to-implement solution for better work days. Available across industries, our thoughtfully designed system helps guarantee real privacy and productivity.',
      image: 'office-writing.jpg',
      alt: 'A person writing in a notebook at a desk',
    },
    benefits: {
      title: 'Work Smarter, Not Harder',
      text: 'When you build a workspace without devices, innovation takes root. Discover the benefits of going mobile phone-free.',
      items: [
        {
          title: 'Confidential information safeguarded',
          text: 'Reduce security risks and keep trade secrets on lockdown. Storing devices prevents leaks and keeps intellectual property protected. Protect client privacy and stop unauthorized recording.',
          image: 'office-women.jpg',
          alt: 'Two colleagues talking in an office',
        },
        {
          title: 'Streamlined and safe operations',
          text: 'A consistent, visible process at the door replaces ad-hoc rules, sign-in sheets and lockers.',
          image: 'sticky-notes.jpg',
          alt: 'Sticky notes on a glass wall',
        },
        {
          title: 'Increased productivity and professionalism',
          text: 'Meetings run shorter, attention runs longer, and customers get the full attention of your team.',
          image: 'desk-hands.jpg',
          alt: 'Hands over a desk covered in documents',
        },
      ],
    },
    stories: {
      title: 'The Trusted Choice For Better Business',
      text: 'Courts, studios and businesses of every size choose Yondr to limit cell phone use. Here’s what the press has reported.',
      quotes: [
        {
          quote:
            'From 25,000 locked phones in 2015 to over 10 million expected users in 2024, Yondr’s simple pouch solution is transforming schools, venues and courtrooms.',
          name: 'The Wall Street Journal',
          role: 'What Does It Take to Stop Checking Your Phone? A Bag With a Lock',
          url: 'https://www.wsj.com/tech/personal-tech/tech-addiction-solution-yondr-phones-1c5629f8',
        },
        {
          quote:
            'Graham Dugoni, who founded Yondr in 2014, lamented that many people still have difficulty figuring out how to “be a human in the world with a computer in your pocket.”',
          name: 'The New York Times',
          role: 'On phone-free Broadway productions',
          url: 'https://www.nytimes.com/2022/06/01/arts/broadway-nudity-phone-cameras.html',
        },
      ],
    },
    resources: {
      title: 'Resources For Institutions',
      text: 'Need help transitioning your workplace to be smartphone-free? We’re happy to make it a team effort.',
      items: [
        {
          title: 'Commercial FAQ',
          text: 'Courts, offices and sensitive sites.',
          href: '/faq#commercial',
          icon: 'arrow-right',
        },
        {
          title: 'How It Works',
          text: 'The pouch, the base, the routine.',
          href: '/how-it-works',
          icon: 'arrow-right',
        },
        {
          title: 'Our Story',
          text: 'A decade of phone-free spaces.',
          href: '/timeline',
          icon: 'arrow-right',
        },
        { title: 'Press Coverage', text: 'Yondr in the news.', href: '/press', icon: 'arrow-right' },
      ],
      feature: {
        title: 'Secure Your Space',
        text: 'Offices, courthouses, productions and hospitality.',
        image: 'paperclips.jpg',
        href: '/get-started?space=commercial',
        cta: 'Get Started',
      },
    },
  },
];

export const getSpace = (slug: Space['slug']) => spaces.find((s) => s.slug === slug)!;
