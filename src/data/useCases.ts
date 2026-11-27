// Use-case ("spaces") pages migrated verbatim from the live site. One entry per old URL.
// Images live in src/assets/images/usecases/<image>.

export interface UseCase {
  slug: string;
  parent: 'education' | 'live-events' | 'commercial';
  oldPath: string;
  name: string;
  title: string;
  intro: string;
  sections: { heading?: string; body: string[] }[];
  bullets?: string[];
  stats?: { value: string; label: string }[];
  quotes?: { quote: string; name: string; role?: string }[];
  videos?: { title: string; url: string }[];
  names?: string[];
  image: string;
  imageAlt: string;
  seoDescription: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'schools',
    parent: 'education',
    oldPath: '/phone-free-schools',
    name: 'Schools',
    title: 'Schools',
    intro:
      'Since 2014, Yondr has led the charge to create phone-free spaces, supporting millions of students around the world every day. With partner support and implementation based in all 50 states and over 48 countries, Yondr is proud to work with schools to help students experience the focus, creativity, and relief that comes with a phone-free education.',
    sections: [
      {
        heading: 'Our leading approach',
        body: [
          'At Yondr, we believe the pouch is just one piece of the puzzle. The Yondr Phone-Free Schools Program includes a suite of resources designed to ensure a seamless transition, based on 10+ years experience working with thousands of educators around the world.',
          'Our leading approach empowers schools:',
          'Policy Consultation and Development',
          'Operational Planning and Equipment',
          'Training and Ongoing Support',
          'Our unique, lockable pouch means students keep their phones, but cannot access them during the school day. Teachers no longer have to be the phone police, and pupils get a much needed 6-8 hour break from digital distractions.',
        ],
      },
      {
        heading: 'Unlock funding for a phone-free future',
        body: [
          'Looking to implement a phone-free program at your school or district?',
          'Download the Yondr 2025 Funding Guide to discover how you can tap into federal, state, and local funding streams. In this free guide, you’ll find:',
          'Funding alignment with key federal programs like Title I, Title IV-A, and IDEA',
          'Braided funding strategies to combine resources and maximize impact',
          'Step-by-step implementation support to build sustainable, distraction-free campuses',
        ],
      },
      {
        heading: 'Millions of students use Yondr every day',
        body: ['We partner with thousands of schools across 48 countries.'],
      },
      {
        heading: 'Want to join our global community of phone-free schools?',
        body: [
          'To learn more about the Yondr Program, click below to request a free demo or consultation.',
          'Yondr has offices in California, New York, Minnesota, London, and Sydney.',
        ],
      },
    ],
    bullets: [
      'Enhanced student engagement: Minimize distractions in the classroom and promote student engagement by eliminating the use of devices.',
      'Improved classroom management: Teachers regain control of their classroom and foster more positive relationships with their students.',
      'Better staff retention: Yondr has been instrumental in retaining school staff and cultivating a more pleasant work environment.',
      'Improved safety and security: Students cannot use their devices for unauthorized activities or inappropriate content.',
      'Sustainable results: Our solutions are tailored to the specific needs of each school, and our partners choose us for our instant results.',
    ],
    stats: [
      {
        value: '50',
        label: 'states with partner support and implementation',
      },
      {
        value: '48',
        label: 'countries',
      },
      {
        value: '6-8 hours',
        label: 'daily break from digital distractions',
      },
    ],
    quotes: [
      {
        quote:
          'It was one of the smoothest rollouts I’ve ever seen. They wanted to sum it up that Yondr changed their lives.',
        name: 'Jennie Bates',
        role: 'Area Superintendent - Fox 4 News',
      },
      {
        quote:
          'No phones means we minimise the risk of cyber-bullying or breaches of child protection during the school day.',
        name: 'Siobhán Foster',
        role: 'De La Salle College, Ireland',
      },
      {
        quote:
          'There has been much more student interaction and communication in the yard at recess and at lunch times. There is also no messaging in class so students are more focused and there has been less bullying.',
        name: 'Meningie Area School',
        role: 'Australia',
      },
    ],
    videos: [
      {
        title: 'Millions of students use Yondr every day',
        url: 'https://player.vimeo.com/video/986781861?h=1e0ea932a0',
      },
    ],
    names: ['De La Salle College', 'Meningie Area School'],
    image: 'schools.jpg',
    imageAlt: 'Two students in school uniform unlocking their Yondr pouches at an unlocking base',
    seoDescription:
      'Yondr has developed a unique product and program to allow schools to become phone-free, from arrival to dismissal',
  },
  {
    slug: 'universities',
    parent: 'education',
    oldPath: '/phone-free-universities',
    name: 'Universities',
    title: 'Universities',
    intro:
      'We partner with colleges and post-secondary programs to build phone-free spaces that support focus, academic success, and well-being. By promoting responsible phone use without confiscation, we streamline logistics, ease stress, and ensure fairness—keeping the focus on what matters: the test, the lesson, the experience.',
    sections: [
      {
        heading: 'Where Yondr works on campus',
        body: ['Choose the environment—each program can be tailored by space, event, or department.'],
      },
      {
        heading: 'Testing Centers',
        body: [
          'Strengthen exam integrity by preventing unauthorized device use—while keeping the process smooth, consistent, and low-stress for students.',
        ],
      },
      {
        heading: 'Lecture Halls',
        body: [
          'Reduce in-class distractions in lectures and seminars—helping students stay engaged, take better notes, and retain more each session.',
        ],
      },
      {
        heading: 'Libraries',
        body: [
          'Protect quiet, distraction-free study in libraries and research spaces—supporting deeper reading, longer focus, and stronger academic performance.',
        ],
      },
      {
        heading: 'Student Activities & Programming',
        body: [
          'Make orientations and student events more present and social—encouraging real connection, participation, and community-building across campus.',
        ],
      },
      {
        heading: 'Wellness & Recreation',
        body: [
          'Create calm, phone-free zones in wellness centers and studios—so students can reset, recharge, and reconnect without digital noise.',
        ],
      },
      {
        heading: 'Testing community recognition',
        body: [
          'NCTA Member',
          'Recognized for Best Customer Service',
          'The NCTA logo is a service mark of the National College Testing Association in the United States and is used by permission.',
        ],
      },
      {
        heading: 'Want to bring Yondr to your campus?',
        body: ['Click below to request a consultation.'],
      },
    ],
    quotes: [
      {
        quote:
          'Implementing Yondr at Detroit Mercy Law was a night and day transformation. For the first time, I received no student complaints—just consistency, security, and a clear message of integrity.',
        name: 'Associate Dean of Student Affairs',
        role: 'University of Detroit Mercy School of Law',
      },
      {
        quote:
          'The phone-free environment makes me want to reach out to classmates I haven’t really talked with—and get to know them on a different level.',
        name: 'Student',
        role: 'University of Maryland (via CBS Baltimore)',
      },
      {
        quote:
          'Game-changer! Phones and cheating were always an issue, but since using Yondr, we have had zero incidents.',
        name: 'Director of Testing',
        role: 'Louisiana State University',
      },
      {
        quote:
          'Thanks to the Yondr pouch, I was able to complete all my work and go home feeling less stressed.',
        name: 'Student',
        role: 'Princeton University: Firestone Library (via The Daily Princetonian)',
      },
    ],
    names: [
      'University of Detroit Mercy School of Law',
      'University of Maryland',
      'Louisiana State University',
      'Princeton University',
      'National College Testing Association',
    ],
    image: 'universities.jpg',
    imageAlt: 'Students listening and raising hands in a university lecture room',
    seoDescription:
      'We partner with colleges and post-secondary programs to build phone-free spaces that support focus, academic success, and well-being.',
  },
  {
    slug: 'camps',
    parent: 'education',
    oldPath: '/camps-youth-programs',
    name: 'Camps & Youth Programs',
    title: 'Camps / Youth Programs',
    intro:
      'Give kids and counselors the freedom to connect, explore, and grow—without devices getting in the way. Whether it’s summer camp, a youth retreat, or an after-school program, Yondr helps to create immersive, phone-free spaces where friendships flourish, skills develop, and memories are made that last a lifetime.',
    sections: [
      {
        heading: 'See it in action: Muskoka Woods',
        body: [
          'What happens when 3,000+ kids and counselors unplug for the summer? Muskoka Woods, a premier ACA-accredited overnight camp in Ontario, has embraced a completely phone-free experience with Yondr. Watch how this world-class camp fosters deeper connections, adventure, and personal growth—helping campers and staff unplug, be present, and thrive.',
        ],
      },
      {
        body: [
          'Without screens, campers and counselors build deeper relationships, strengthen teamwork, and create a true sense of community.',
          'A phone-free setting boosts confidence, problem-solving, and resilience—helping kids navigate challenges on their own.',
          'Without digital distractions, campers fully engage in outdoor activities, develop mindfulness, and connect with nature.',
        ],
      },
      {
        heading: 'Day camp: simple & seamless',
        body: [
          'At the end of each session, Yondr pouches are securely collected in compact totes for easy storage and redistribution.',
        ],
      },
      {
        heading: 'Overnight camp: balanced & connected',
        body: [
          'Our portable unlocking system allows for scheduled phone access in designated areas, giving campers a balanced way to stay connected.',
        ],
      },
      {
        heading: 'Discover how easy it is to bring a phone-free experience to your camp.',
        body: ['Contact us today to learn more!'],
      },
    ],
    stats: [
      {
        value: '3,000+',
        label: 'kids and counselors unplug for the summer at Muskoka Woods',
      },
    ],
    quotes: [
      {
        quote:
          'Yondr has helped Camp Lurecrest spend more time together and less time on screens. Our partnership has helped us carry out our mission, and we truly value the relationship we share.',
        name: 'Dan Bragdon',
        role: 'Executive Director, Camp Lurecrest Ministries',
      },
      {
        quote:
          'Partnering with Yondr has been a game-changer for our YMCA programs. Their system has helped us create more focused, engaging environments for both our camp and child care participants. By minimizing digital distractions, Yondr supports our mission of youth development, healthy living, and social responsibility in a very tangible way. It’s been a valuable tool in helping our staff and families foster deeper connections and more meaningful experiences.',
        name: 'Valencia Williams',
        role: 'YMCA Vice President of Operations',
      },
      {
        quote:
          'We’ve seen kids grow in confidence, independence, and connection when they take a break from devices. Yondr helps us ensure they get the best summer camp experience possible.',
        name: 'Paul Cade',
        role: 'Summer Camp Director, Muskoka Woods',
      },
    ],
    names: ['Muskoka Woods', 'Camp Lurecrest Ministries', 'YMCA'],
    image: 'camps.jpg',
    imageAlt: 'Campers in matching t-shirts standing arm in arm in a forest',
    seoDescription:
      'Give kids and counselors the freedom to connect, explore, and grow—without devices getting in the way.',
  },
  {
    slug: 'music',
    parent: 'live-events',
    oldPath: '/phone-free-music',
    name: 'Music',
    title: 'Music',
    intro:
      'Phones have fundamentally changed live performances. Artists look out on a sea of smartphones instead of faces, and audiences are busy recording rather than truly engaging. Yondr is trusted by musicians around the world to create phone-free performances that fans will never forget.',
    sections: [
      {
        body: [
          'The audience is present. The performer is free. The energy is unparalleled. Yondr works with artists, venues, promoters, and labels to create phone-free shows and tours.',
          'Beyond large capacity arena tours and residencies, Yondr is also trusted for intimate performances, exclusive events, listening parties, private recording studios, and content control.',
        ],
      },
      {
        heading: 'Phone-free shows feel different',
        body: [],
      },
      {
        heading: 'How it works',
        body: [
          'As guests enter the phone-free area, phones are secured in Yondr pouches.',
          'Guests maintain possession of their phones at all times during the show.',
          'There are designated phone-use areas located throughout the venue.',
          'When exiting, guests tap their pouches on any unlocking base to open.',
        ],
      },
      {
        heading: 'Want to make your show phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    quotes: [
      {
        quote:
          'I want to give people an experience. Telling people to put their phones away really forces a person to be present.',
        name: 'Donald Glover',
        role: 'Childish Gambino',
      },
      {
        quote:
          'In a little while we’ll look back and say, ‘We were a little out of control with our use of phones. We didn’t really know boundaries. We were working it out.’',
        name: 'Wesley Schultz',
        role: 'The Lumineers',
      },
      {
        quote:
          'People absolutely love it. You immediately know that they are engaged. The first show you play you can tell the difference.',
        name: 'Jack White',
      },
    ],
    videos: [
      {
        title: 'PBS News Hour',
        url: 'https://player.vimeo.com/video/862141487',
      },
    ],
    names: ['Donald Glover (Childish Gambino)', 'The Lumineers', 'Jack White'],
    image: 'music.jpg',
    imageAlt: 'Crowd in front of a brightly lit concert stage',
    seoDescription:
      'Yondr is trusted by musicians around the world to create phone-free performances that fans will never forget',
  },
  {
    slug: 'comedy',
    parent: 'live-events',
    oldPath: '/phone-free-comedy-shows',
    name: 'Comedy',
    title: 'Comedy',
    intro:
      'Freedom of expression and audience connection are essential ingredients for great comedy. Yondr facilitates phone-free shows and tours for comedians across clubs, theaters, arenas, and amphitheaters all over the world.',
    sections: [
      {
        heading: 'The new standard for comedy',
        body: [
          'Phones disrupt the comedian’s creative process, and unwanted recording and sharing is problematic for artists trying out new jokes, perfecting their set, or protecting a tour’s worth of material. Yondr works with top comedians to help them reclaim the stage and put on their best show yet.',
        ],
      },
      {
        heading: 'Want to make your comedy show phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    image: 'comedy.jpg',
    imageAlt: 'Theater marquee reading “Chris Rock Total Blackout Tour Sold Out”',
    seoDescription:
      'Yondr facilitates phone-free shows and tours for comedians across clubs, theaters, arenas and amphitheaters all over the world',
  },
  {
    slug: 'events',
    parent: 'live-events',
    oldPath: '/phone-free-events',
    name: 'Events & Weddings',
    title: 'Events & Weddings',
    intro:
      'Yondr creates phone-free weddings, birthdays, family gatherings, private parties, retreats, corporate events, and more.',
    sections: [
      {
        heading: 'Weddings',
        body: [
          'Phone-free ceremonies and receptions are more intimate, celebratory, and fun. No bride wants their walk down the aisle (or their pictures) to be ruined by a sea of screens.',
        ],
      },
      {
        heading: 'Corporate Events',
        body: [
          'Yondr facilitates a wide array of corporate events ranging from conferences, retreats, summits, and more.',
        ],
      },
      {
        heading: 'Private Events',
        body: [
          'Any event can be phone-free, whether it’s a 40th birthday bash, alumni event, or family reunion.',
        ],
      },
      {
        heading: 'In the press',
        body: [
          'The Knot: Randall Cobb and Aiyda Ghahramani’s Green Bay Packers-studded, black-tie wedding',
          'Forbes: Inviting guests to a party without inviting their phones',
          'The Undefeated: Inside Dave Chappelle’s perfect and mysterious ‘Juke Joint’ at All-Star Weekend',
        ],
      },
      {
        heading: 'Want to make your event or wedding phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    quotes: [
      {
        quote:
          'The entire day was unplugged, which was wonderful. All of our guests were able to enjoy themselves. We lived in the moment. No one was worried about their phone or posts on social media.',
        name: 'Randall & Aiyda Cobb',
        role: 'The Knot Wedding of the Year',
      },
    ],
    names: ['Randall Cobb', 'The Knot', 'Forbes', 'The Undefeated', 'Dave Chappelle'],
    image: 'events.jpg',
    imageAlt: 'Guests applauding a couple at an outdoor wedding ceremony',
    seoDescription:
      'Yondr creates phone-free weddings, birthdays, family gatherings, private parties, retreats and corporate events and more',
  },
  {
    slug: 'productions',
    parent: 'live-events',
    oldPath: '/phone-free-productions',
    name: 'Productions',
    title: 'Productions',
    intro:
      'From Broadway to film sets and live tapings to music video shoots, Yondr creates phone-free environments that enhance focus, protect creative work, and safeguard privacy—ensuring a secure, immersive experience for both performers and audiences. No distractions. No leaks. Just the experience as it was meant to be.',
    sections: [
      {
        heading: 'Want to make your production phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    quotes: [
      {
        quote:
          'What surprised us about the success of Yondr was how much audiences appreciated it. They truly valued the phone-free oasis we created for 90 minutes in their lives.',
        name: 'Lin-Manuel Miranda',
        role: 'Freestyle Love Supreme in Las Vegas',
      },
    ],
    names: ['Lin-Manuel Miranda', 'Freestyle Love Supreme'],
    image: 'productions.jpg',
    imageAlt: 'Camera crew filming a performer on a stage lit with neon tubes',
    seoDescription:
      'Yondr helps maintain privacy and security on TV and film productions, music video shoots, live audience tapings and more',
  },
  {
    slug: 'courts',
    parent: 'commercial',
    oldPath: '/phone-free-courthouses',
    name: 'Courts',
    title: 'Make Your Courthouse Phone-Free',
    intro:
      'Yondr provides the industry leading solution for cell phone security in courthouses around the world.',
    sections: [
      {
        heading: 'Streamlined cellphone management for visitors.',
        body: [
          "Cellphones are disrupting the courtroom, with surreptitious recording and witness intimidation on the rise. Yondr provides a more secure, focused, and respectful environment for legal proceedings while preserving the justice system's integrity.",
        ],
      },
      {
        heading: 'Want to make your courthouse phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    bullets: [
      'Enhanced security: Prevents unauthorized recording and dissemination of sensitive courtroom proceedings.',
      'Maintaining privacy: Preserves the privacy of jurors, witnesses, and victims, reducing the risk of intimidation or harassment.',
      'Minimized distractions: Enhances the overall decorum and professionalism within the courtroom.',
      'Protect confidentiality: Ensures that sensitive information remains secure and protected from unauthorized disclosure, particularly in high-profile or sensitive cases.',
      'Respectful court environment: Encourages respect for the court and its procedures by setting clear guidelines regarding cell phone usage.',
    ],
    quotes: [
      {
        quote:
          'By partnering with Yondr, we implemented a straightforward and effective solution that promotes attentiveness, security, and protects privacy in today’s technology-driven world while avoiding unnecessary barriers.',
        name: 'Chaz Haywood',
        role: 'Clerk of Court, Rockingham/Harrisonburg County Court, Harrisonburg, Virginia',
      },
      {
        quote:
          'Things are going great!!! Folks are pleased to be able to bring in their phones and the deputies are doing a great job! I am thrilled with this program and the service provided by everyone, thanks so much for an excellent roll out of this amazing program!!!',
        name: 'Michelle Pitsch',
        role: 'Judicial Administrator, 14th Judicial District Court, Lake Charles, Louisiana',
      },
      {
        quote:
          "It's always been an issue for us to take cell phones from the public because there's nowhere to store them, and we're responsible for them if they get damaged or misplaced. Yondr eliminates all that.",
        name: 'John Loomis',
        role: 'Erie County Court',
      },
    ],
    videos: [
      {
        title: 'How the Yondr Program Works',
        url: 'https://vimeo.com/1106260603',
      },
    ],
    names: [
      'Rockingham/Harrisonburg County Court',
      '14th Judicial District Court, Lake Charles, Louisiana',
      'Erie County Court',
    ],
    image: 'courts.jpg',
    imageAlt: 'A Yondr pouch and unlocking base',
    seoDescription:
      'Yondr provides the industry leading solution for cell phone security in courthouses around the United States',
  },
  {
    slug: 'workplace',
    parent: 'commercial',
    oldPath: '/phone-free-workplace',
    name: 'Workplace',
    title: 'Workplace',
    intro:
      'Yondr is trusted by both Fortune 500 companies and small businesses to create phone-free work environments that encourage productivity, privacy, and ensure employee safety.',
    sections: [
      {
        heading: 'Elevating workforce potential',
        body: [
          'Smartphone distractions are one of the leading causes of accidents and injuries in the workplace. Create a more focused and secure work environment that encourages productivity, protects sensitive information, and prioritizes the well-being of your employees.',
        ],
      },
      {
        heading: 'Want to make your workplace phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    bullets: [
      'Safety & compliance: Minimizes risk of accidents for employees operating machinery or performing hazardous tasks.',
      'Confidentiality & IP protection: Safeguards intellectual property, trade secrets, and confidential discussions within the workplace.',
      'Enhanced security: Provides additional protection against corporate espionage or unauthorized access to sensitive areas.',
      'Increased focus & productivity: Encourages employees to stay focused on tasks and responsibilities.',
      'Streamlined operations: Eliminates the need for dedicated phone storage infrastructure.',
    ],
    names: [
      'Ubisoft+',
      'Mazda',
      'Amazon.com',
      'GMC',
      'Google',
      'IMAX',
      'Apple',
      'Mercedes-Benz',
      'Nissan',
      'Paramount',
    ],
    image: 'workplace.jpg',
    imageAlt: 'Colleagues working together around a whiteboard in a bright office',
    seoDescription:
      'Yondr is trusted by both Fortune 500 companies and small businesses to create phone-free work environments.',
  },
  {
    slug: 'hospitality',
    parent: 'commercial',
    oldPath: '/phone-free-hospitality',
    name: 'Hospitality',
    title: 'Hospitality',
    intro:
      'Yondr offers tailored phone-free solutions for hotels, resorts, bars, and restaurants for your patrons or staff.',
    sections: [
      {
        heading: 'Want to make your venue phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    image: 'hospitality.jpg',
    imageAlt: 'Guests seated at a warmly lit bar',
    seoDescription:
      'Yondr offers tailored phone-free solutions for hotels, resorts, bars and restaurants for your patrons or staff',
  },
  {
    slug: 'other',
    parent: 'commercial',
    oldPath: '/other',
    name: 'Other',
    title: 'Other',
    intro:
      "Have an idea for a phone-free experience that doesn’t fit into the categories we’ve mentioned? No problem. We'll work with you directly to conceptualize and implement a phone-free space. Reach out to us with your ideas.",
    sections: [
      {
        heading: 'Want to make your space phone-free?',
        body: ['Click below to request a free demo or consultation.'],
      },
    ],
    image: 'other.jpg',
    imageAlt: 'People gathered on a grassy field at sunset',
    seoDescription:
      'Yondr will work with you directly to conceptualize and implement a phone-free space. Reach out to us with your ideas',
  },
];
