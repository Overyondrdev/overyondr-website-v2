// FAQ content migrated verbatim from /faq
// The source page is a single flat list; questions are grouped here by topic.
// The source has no commercial or at-home questions, so those groups are omitted.

export interface FaqItem {
  q: string;
  a: string;
} // `a` is simple HTML: <p>, <ul><li>, <a href>, <strong>.
export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faq: FaqGroup[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        q: 'What Is Yondr?',
        a: '<p>Yondr creates phone-free spaces for artists, comedians, teachers, organizations, and more. The Yondr system is a simple solution that allows you to maintain possession of your phone at all times.</p>',
      },
      {
        q: 'Will The Pouch Affect My Phone In Any Way?',
        a: '<p>No</p>',
      },
      {
        q: 'Are magnets used in Yondr unlocking bases?',
        a: '<p>Yes. This product uses magnets as part of its unlocking mechanism.</p>',
      },
      {
        q: 'Do Yondr unlocking bases interfere with implanted medical devices?',
        a: '<p>Yondr does not provide medical advice regarding use with implanted medical devices. Magnets may interfere with certain medical devices such as shunts or cardiac devices. For users with medical shunts or other devices, please consult with a medical professional or refer to medical device manufacturer’s guidance on safe distance.</p>',
      },
      {
        q: 'Do all Yondr pouches require the use of a magnetic unlocking base?',
        a: "<p>No. Some Yondr pouches do not require the use of a magnetic unlocking base. Yondr's product range also includes a velcro pouch, which can be opened directly by the user, without any additional unlocking equipment.</p>",
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    items: [
      {
        q: 'What Is A Phone-Free School?',
        a: '<p>A phone-free school is a distraction-free learning environment where students keep their smartphones and other personal technology (airpods/apple watches) in Yondr pouches from arrival to dismissal. Yondr works with thousands of schools across 27 countries and all 50 U.S. States.</p>',
      },
    ],
  },
  {
    id: 'live-events',
    title: 'Live Events',
    items: [
      {
        q: 'What Is A Phone-Free Show?',
        a: '<p>At a phone-free show, artists and audiences can enjoy the performance in the moment and without distraction, creating a better experience for everyone. No cell phones, smart watches, cameras, or recording devices are permitted in the performance area.</p>',
      },
      {
        q: 'How Does It Work?',
        a: '<p>Upon arrival at the venue, all phones and smart watches are placed in Yondr pouches by our staff.</p><p>Guests maintain possession of their phones at all times. Anyone may access their phone during the show by entering one of the designated Phone Use Areas located throughout the venue.</p><p>When the show is over, guests can unlock their Yondr pouches at any exit.</p><p><a href="/how-it-works"><strong>LEARN MORE →</strong></a></p>',
      },
      {
        q: 'Do I Maintain Possession Of My Phone At All Times?',
        a: '<p>Yes. You will maintain possession of your phone and are responsible for it throughout the duration of the event.</p>',
      },
      {
        q: 'My ticket is on my phone. What do I do?',
        a: '<p>It’s preferable to have a hard ticket for entry, but Yondr staff will be standing by to unlock your phone so you can access your mobile ticket in order to enter the venue.</p>',
      },
      {
        q: 'I have a babysitter at home — Where can I check my phone? I am on-call for work — Where can I check my phone?',
        a: '<p>Set your phone to vibrate as you enter the venue. You’ll be able to feel your phone vibrate through the Yondr pouch when you receive calls or texts. You may use your phone at any time throughout the event at designated Phone Use Areas inside the venue.</p>',
      },
      {
        q: 'What is a Phone Use Area?',
        a: '<p>Guests are able to use their phones at designated Phone Use Areas inside the venue. All phones must be secured in Yondr pouches before guests re-enter the performance space.</p>',
      },
      {
        q: 'How do I unlock my phone after the show?',
        a: '<p>Yondr staff will be stationed at all exits to unlock your phone at the end of the show. After Yondr staff unlocks your pouch, simply remove your items and toss the pouch in one of the bins stationed at exit points.</p>',
      },
      {
        q: 'Does it take long to unlock the Pouch and leave the venue?',
        a: '<p>No. Yondr staff are located at each exit to quickly unlock your pouch. We find that leaving a phone-free show is usually faster. It’s amazing how quickly people move when they aren’t busy screen-touching.</p>',
      },
      {
        q: 'I didn’t know about the phone policy. What if I don’t want to do this?',
        a: '<p>This is the show policy, and as a result we cannot allow entry to any guests with cell phones or smart watches if they are not secured in a Yondr pouch.</p>',
      },
      {
        q: 'What happens if there is an emergency in the venue and I can’t access my phone?',
        a: '<p>All venue staff and security have cell phones and radios. Should an emergency occur, they are trained to implement and execute safety and emergency procedures. Guests should follow all venue instructions and evacuate immediately in the case of an emergency. Yondr Venue Staff will have hand-held unlocking devices outside at a safe distance from the venue.</p>',
      },
      {
        q: 'If I lose something at a Yondr show, who do I contact?',
        a: '<p>Before contacting us, please check with the venue of the show/event, as any items found the night of are left with the venue’s customer service department.</p><p>If the venue doesn\'t have your item, please fill out <a href="https://airtable.com/shrjZh2rcEDXouGf8"><strong>this form</strong></a> and we will try to locate your property as quickly as possible.</p>',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Additional questions from the V3 prototype that the live FAQ does not cover yet.
// Answers are written from information already published on the site; review before launch.
const additions: Record<string, FaqItem[]> = {
  general: [
    {
      q: 'How much do Yondr lockable phone pouches cost?',
      a: '<p>Pricing depends on the size and type of program, whether that’s a single school, a district, a venue or a tour. <a href="/get-started">Tell us about your space</a> and our team will put together a quote.</p>',
    },
    {
      q: 'How can I get in contact?',
      a: '<p>Fill out the form on our <a href="/get-started">Get Started</a> page, or email <a href="mailto:team@overyondr.com">team@overyondr.com</a>. Media inquiries can go to <a href="mailto:press@overyondr.com">press@overyondr.com</a>.</p>',
    },
  ],
  education: [
    {
      q: 'Can students keep their phones with them?',
      a: '<p>Yes. Each student keeps their own phone, locked in their own pouch, for the whole school day. Nothing is collected or confiscated.</p>',
    },
    {
      q: 'What if a student needs access to their phone for medical reasons?',
      a: '<p>Yondr offers specialized pouches for students with medical needs, and schools set their own procedures for emergencies and exceptions. <a href="/get-started?space=education">Talk to our team</a> about your requirements.</p>',
    },
    {
      q: 'How can I tell if there’s a school cell phone ban law in my state?',
      a: '<p>Visit our <a href="/school-phone-bans">School Phone Bans</a> hub for an overview of state legislation and links to state-by-state pages.</p>',
    },
  ],
};

const commercial: FaqGroup = {
  id: 'commercial',
  title: 'Commercial',
  items: [
    {
      q: 'What types of places benefit from phone-free spaces?',
      a: '<p>Workplaces, courthouses, film and TV productions, hospitality venues and any space where privacy, security or focus matter.</p>',
    },
    {
      q: 'Can employees or visitors still carry their phones while using a phone pouch?',
      a: '<p>Yes. People keep their own phone with them, locked in the pouch, until they unlock it on the way out.</p>',
    },
    {
      q: 'Why use phone pouches instead of asking people to silence their phones?',
      a: '<p>A locked pouch removes the temptation and the possibility of recording entirely, and it makes the policy visible and consistent for everyone, so staff don’t have to police it.</p>',
    },
  ],
};

for (const g of faq) g.items.push(...(additions[g.id] ?? []));
if (!faq.some((g) => g.id === 'commercial')) faq.push(commercial);
