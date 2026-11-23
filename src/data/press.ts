// Press coverage, migrated from overyondr.com/press (November 2026). Newest first.
// Entries without a url are listed on the live site without a link.
export interface PressItem {
  outlet: string;
  title?: string;
  date: string; // ISO date (day may be approximate when the source gives only a month)
  excerpt: string;
  url?: string;
}

export const press: PressItem[] = [
  {
    outlet: 'Axios',
    date: '2026-04-05',
    excerpt:
      'At Charlotte\'s Antagonist and D.C.\'s Hush Harbor, guests lock their phones in Yondr pouches on arrival. "A phone-free bar brought me an experience I rarely have, total disconnection… I walked away feeling more connected (to him) than ever," one patron told Axios.',
    url: 'https://www.axios.com/2026/04/05/phone-free-restaurants-bars-bans-restrictions-offline',
  },
  {
    outlet: 'CNN',
    date: '2026-03-20',
    excerpt:
      '"Once you\'ve been at a show where no one is holding up a screen, you understand what\'s been missing," Yondr founder Graham Dugoni told CNN. "The shared energy, the feeling of being somewhere together, the spontaneity and freedom that comes with enjoying a moment that isn\'t being recorded or splintered by constant distractions."',
    url: 'https://www.cnn.com/world/no-phones-concert-crowds-harry-styles-spc',
  },
  {
    outlet: 'BBC',
    date: '2026-01-25',
    excerpt:
      '"There have been notable improvements in academic performance, and headteachers also report reductions in bullying," Yondr founder Graham Dugoni told the BBC, as lockable pouches gain traction in UK schools, theatres, and concerts.',
    url: 'https://www.bbc.co.uk/news/articles/c3w8rldgrnno',
  },
  {
    outlet: 'Daily Mail',
    date: '2026-01-01',
    excerpt:
      "Yondr founder Graham Dugoni makes the case for phone-free classrooms as the UK debates a nationwide school smartphone ban, with the company's lockable pouches already used by hundreds of thousands of pupils across Britain.",
    url: 'https://www.msn.com/en-nz/news/other/yondr-boss-wants-smartphones-expelled-from-schools/ar-AA1UUhgd',
  },
  {
    outlet: 'Schools Week',
    date: '2025-12-02',
    excerpt:
      '"There\'s broad social acceptance, I think, of what we do," Dugoni told Schools Week, as Yondr now works with entire multi-academy trusts in the UK and whole states in the US — with more than 250,000 pupils across 500 UK schools using the programme.',
    url: 'https://schoolsweek.co.uk/profile-graham-dugoni-founder-and-ceo-of-yondr/',
  },
  {
    outlet: 'CBS News',
    date: '2025-09-07',
    excerpt:
      '"Our whole perspective is that it\'s not taking something away from students, it\'s giving them something back," Dugoni told CBS News, as at least 2.5 million students across 35 states now use Yondr pouches.',
    url: 'https://www.cbsnews.com/news/yondr-pouches-school-cell-phone-ban/',
  },
  {
    outlet: 'Spectrum News NY1',
    date: '2025-09-04',
    excerpt:
      'Roughly 800 NYC schools are using pouches like Yondr to comply with the new statewide ban, allowing students to hold onto their phones while making them impossible to access during the school day.',
    url: 'https://ny1.com/nyc/all-boroughs/news/2025/09/04/first-day-of-class-and-cellphone-ban-for-nyc-public-school-students',
  },
  {
    outlet: 'Spectrum News NY1',
    date: '2025-06-23',
    excerpt:
      'Each morning, students at Bronx Prep High School place their phones into a Yondr pouch and cannot unlock them until the day is over — a model for the statewide bell-to-bell ban coming to every New York school in September.',
    url: 'https://ny1.com/nyc/all-boroughs/education/2025/06/23/how-one-bronx-school-is-keeping-kids-off-their-cell-phones',
  },
  {
    outlet: 'Yondr Announcement',
    date: '2025-05-22',
    excerpt:
      'Former UK Schools Minister Sir Nick Gibb has joined Yondr as Strategic Adviser, bringing over a decade of education policy experience to help expand distraction-free learning across the country.',
    url: '/blog/sir-nick-gibb-announcement',
  },
  {
    outlet: 'CBS News New York',
    date: '2025-03-31',
    excerpt:
      "At United Charter High Schools in the Bronx, Yondr pouches lock students' phones away for the day — encouraging less screen time and more time for learning ahead of New York's statewide ban.",
    url: 'https://www.cbsnews.com/newyork/news/cellphone-ban-benefits-bronx-schools/',
  },
  {
    outlet: 'The New York Times',
    date: '2025-03-21',
    excerpt: '“The success in Schoharie has been a showpiece in Gov. Kathy Hochul’s…',
    url: 'https://www.nytimes.com/2025/03/21/nyregion/school-cell-phone-ban-nyc.html?unlocked_article_code=1.5k4.vKqI.ZYIGpvkaS4X7&smid=url-share',
  },
  {
    outlet: 'Texas Talks Podcast',
    date: '2025-03-20',
    excerpt: '“What Yondr helps schools do: it gives some structure to what…',
    url: 'https://www.youtube.com/watch?v=cQt2Ovd-5VQ',
  },
  {
    outlet: 'The Washington Post',
    date: '2025-03-17',
    excerpt:
      '“It’s not just about not having your phone….it’s actually about what happens to everybody when everyone is truly there with the people in the room and not somewhere else,” Leader said of the magic of a phone-free party.',
    url: 'https://wapo.st/4iwcmM2',
  },
  {
    outlet: 'WAVE Louisville',
    date: '2025-03-06',
    excerpt: '“I feel like it’s become a part of my daily routine. I’m going to school…',
    url: 'https://www.wave3.com/2025/03/07/fern-creek-high-school-shares-success-pilot-program-banning-cell-phone-use-school/',
  },
  {
    outlet: 'Houston Chronicle',
    date: '2025-03-02',
    excerpt:
      "Given the success that a handful of schools and school districts have had with the Yondr solution, lawmakers should feel relatively sure appropriating funding for it won't be in vain.",
    url: 'https://www.houstonchronicle.com/opinion/editorials/article/texas-cellphone-ban-schools-legislature-hisd-20192779.php',
  },
  {
    outlet: 'The Times',
    date: '2025-02-27',
    excerpt: 'Yondr-commissioned study reveals overwhelming support…',
    url: 'https://www.thetimes.com/life-style/parenting/article/parents-want-phone-ban-in-schools-to-improve-classroom-behaviour-hjdsmhxzn',
  },
  {
    outlet: 'Los Angeles Times',
    date: '2025-02-19',
    excerpt: 'Superintendent Alberto Carvalho said, “The teachers I’ve spoken with…',
    url: 'https://www.latimes.com/california/story/2025-02-19/no-major-hitches-on-first-day-without-cellphones-in-la-unified-schools',
  },
  {
    outlet: 'CBS News',
    date: '2025-01-23',
    excerpt: 'New York school enacts cellphone ban as state considers policy…',
    url: 'https://www.cbsnews.com/video/new-york-proposes-ban-smartphones-during-school-hours/',
  },
  {
    outlet: 'On with Kara Swisher',
    date: '2025-01-16',
    excerpt:
      'Kara and Graham talk about the push to ban phones from schools, the company’s success, and his philosophical take on smartphones, social media and technology.',
    url: 'https://open.spotify.com/episode/5UOBjR0sSlXjb23hfCQMog?si=0988443e9912401b',
  },
  {
    outlet: '25 News Now Peoria',
    date: '2025-01-10',
    excerpt: 'Peoria Public Schools said the district is seeing promising results in…',
    url: 'https://www.25newsnow.com/2025/01/10/peoria-public-school-district-sees-promising-results-phone-pouches/',
  },
  {
    outlet: 'The Atlanta Journal-Constitution',
    date: '2025-01-10',
    excerpt: 'Students have reported better-behaved classrooms and feeling…',
    url: 'https://www.ajc.com/education/georgia-school-districts-say-cellphone-bans-are-working/KUALPYII4FDDZHXTP4JNRA4G6M/',
  },
  {
    outlet: 'CBS News',
    date: '2024-12-05',
    excerpt: 'Something feels different inside Brockton High School…',
  },
  {
    outlet: 'NPR',
    date: '2024-12-03',
    excerpt: 'Dugoni says more than 2 million students use pouches in America…',
  },
  {
    outlet: 'The Seattle Times',
    date: '2024-11-12',
    excerpt: 'There wasn’t a phone in sight. The middle school, which has about…',
  },
  {
    outlet: 'CNN',
    title: 'Cell Phone Distraction Called ‘Major Problem’',
    date: '2024-09-03',
    excerpt:
      '72% of US high school teachers say cell phone distraction is a major problem. More schools are enacting rules or tightening enforcement to keep students off their screens.',
    url: 'https://www.cnn.com/2024/09/03/us/back-to-school-bans-cell-phones-hoodies-mirrors/index.html',
  },
  {
    outlet: 'Forbes',
    title: 'Meet Yondr, The Startup Helping Schools Ban Cell Phones',
    date: '2024-08-29',
    excerpt:
      'Districts across America institute new programs banning smartphones, enabled by lockable pouches from 10-year-old company Yondr.',
    url: '/files/forbes-yondr.pdf',
  },
  {
    outlet: 'The Scottish Sun',
    date: '2024-08-29',
    excerpt: 'It was so loud, former teacher says phone ban..',
    url: 'https://www.thescottishsun.co.uk/news/13446185/teacher-phone-ban-transformed-school-overnight/',
  },
  {
    outlet: 'The Washington Post',
    date: '2024-08-27',
    excerpt: 'Cellphone bans spread in schools amid growing mental health worries…',
    url: 'https://www.washingtonpost.com/education/2024/08/27/cell-phone-school-bans/',
  },
  {
    outlet: 'NPR',
    date: '2024-08-08',
    excerpt: 'Arkansas school districts on board with ‘phone-free’ pilot program…',
    url: 'https://www.ualrpublicradio.org/local-regional-news/2024-08-08/arkansas-school-districts-on-board-with-phone-free-pilot-program',
  },
  {
    outlet: 'CBS Mornings',
    date: '2024-08-03',
    excerpt: 'The growing “no phone” movement transformed a Newburgh, NY…',
    url: 'https://youtu.be/eeyGeT0mIDc?si=qePF99l875qC9OwR',
  },
  {
    outlet: 'The Wall Street Journal',
    title: 'What Does It Take to Stop Checking Your Phone? A Bag With a Lock',
    date: '2024-05-23',
    excerpt:
      "From 25,000 locked phones in 2015 to over 10 million expected users in 2024, Yondr's simple pouch solution is transforming schools, venues and courtrooms.",
    url: 'https://www.wsj.com/tech/personal-tech/tech-addiction-solution-yondr-phones-1c5629f8',
  },
  {
    outlet: 'The Times',
    date: '2024-04-09',
    excerpt: 'The Times view on phones in schools: Hang up…',
    url: 'https://www.thetimes.co.uk/article/the-times-view-on-xxxxx-vfchwl77f',
  },
  {
    outlet: 'Axios',
    date: '2024-03-22',
    excerpt: 'The new school essential: A Yondr cellphone pouch…',
    url: 'https://www.axios.com/2024/03/22/yondr-phone-pouch-schools-students',
  },
  {
    outlet: 'Vox',
    title: 'Schools are using Yondr pouches to lock up kids’ cellphones',
    date: '2024-03-19',
    excerpt:
      '“The results for us were just a game-changer,” Patricia Shipe, president of the Akron Education Association which represents teachers and other educators in the district.',
    url: 'https://www.vox.com/24105235/phones-kids-schools-ban-yondr-pouch-smartphones',
  },
  {
    outlet: 'The Spectator',
    date: '2024-03-14',
    excerpt: 'The extraordinary results of one school’s ban on smartphones…',
    url: 'https://www.spectator.co.uk/article/the-extraordinary-results-of-one-schools-ban-on-smartphones/',
  },
  {
    outlet: 'Los Angeles Times',
    date: '2024-03-10',
    excerpt: 'The great concert debate: Are cellphones…',
    url: 'https://www.latimes.com/entertainment-arts/music/story/2022-03-10/mitski-bruno-mars-silk-sonic-cell-phones-concerts',
  },
  {
    outlet: 'The Washington Post',
    date: '2024-03-01',
    excerpt: 'How a Connecticut middle school won the battle against cellphones…',
    url: 'https://www.washingtonpost.com/nation/2024/05/01/school-cellphones-confiscate/',
  },
  {
    outlet: 'KWTX',
    date: '2024-02-27',
    excerpt: 'New cell phone policy improves grades, test results at La Vega High…',
    url: 'https://www.kwtx.com/2024/02/28/new-cell-phone-policy-improves-grades-test-results-la-vega-high-school/',
  },
  {
    outlet: 'The 74 + Yahoo News',
    date: '2023-12-13',
    excerpt: 'Sales Skyrocket for Phone Pouch Company as In-School Bans Spread…',
    url: 'https://news.yahoo.com/exclusive-sales-skyrocket-phone-pouch-130100251.html',
  },
  {
    outlet: 'FOX 17',
    date: '2023-12-13',
    excerpt: 'Garth Brooks has a no-phone policy at his new Vegas show…',
    url: 'https://www.fox17online.com/scrippsnews/garth-brooks-has-a-no-phone-policy-at-his-new-vegas-show',
  },
  {
    outlet: 'BBC',
    title: 'Ashford School To Make Students Lock Their Phones In Pouches',
    date: '2023-12-06',
    excerpt:
      "We have had more students who are saying: 'At last this has been taken seriously. Thank you,' because they recognise that they are at school to learn.",
    url: 'https://www.bbc.com/news/uk-england-kent-67641448',
  },
  {
    outlet: 'The Atlantic',
    date: '2023-06-06',
    excerpt: 'Get Phones Out of Schools Now. They impede learning…',
    url: 'https://www.theatlantic.com/ideas/archive/2023/06/ban-smartphones-phone-free-schools-social-media/674304/',
  },
  {
    outlet: 'The Washington Post',
    date: '2023-05-09',
    excerpt: 'Students can’t get off their phones. Schools have had enough…',
    url: 'https://www.washingtonpost.com/education/2023/05/09/school-cellphone-ban-yondr/',
  },
  {
    outlet: 'The Sydney Morning Herald',
    date: '2023-02-02',
    excerpt: 'NSW high schools ramp up…',
    url: 'https://www.smh.com.au/national/nsw/nsw-high-schools-ramp-up-total-ban-on-mobile-phones-in-classrooms-20230201-p5ch50.html',
  },
  {
    outlet: 'The Philadelphia Inquirer',
    date: '2022-09-18',
    excerpt: 'To ban or not to ban the cell phone?',
    url: 'https://www.inquirer.com/news/schools-cell-phone-policies-pennsylvania-new-jersey-philadelphia-20220918.html',
  },
  {
    outlet: 'The New York Times',
    title: 'With Cameras on Every Phone, Will Broadway’s Nude Scenes Survive?',
    date: '2022-06-01',
    excerpt:
      'Graham Dugoni, who founded Yondr in 2014, lamented that many people still have difficulty figuring out how to “be a human in the world with a computer in your pocket.”',
    url: 'https://www.nytimes.com/2022/06/01/arts/broadway-nudity-phone-cameras.html',
  },
  {
    outlet: 'The Irish Times',
    date: '2022-04-12',
    excerpt: 'A school-smart phone policy? ‘They’re talking to each other more’…',
    url: 'https://www.irishtimes.com/news/education/a-school-smart-phone-policy-they-re-talking-to-each-other-more-1.4844016',
  },
  {
    outlet: 'Variety',
    date: '2022-04-11',
    excerpt: 'Yondr Believes Concertgoers Are Learning to Love…',
    url: 'https://variety.com/2022/music/news/yondr-festival-live-pouch-lockup-1235230522/',
  },
  {
    outlet: 'The Wall Street Journal',
    date: '2020-03-10',
    excerpt: 'Phone Locks in a Time of Cancel Culture…',
    url: 'https://www.wsj.com/articles/yondr-graham-dugoni-profile-11583842460',
  },
  {
    outlet: 'CNN',
    date: '2020-02-06',
    excerpt: 'The agony and ecstasy of being forced to give up our phones…',
    url: 'https://edition.cnn.com/2020/02/06/tech/yondr-smartphone-ban/index.html',
  },
  {
    outlet: 'The Guardian',
    date: '2019-08-28',
    excerpt: 'Teenage hangups: the drastic plans to keep high schoolers off their…',
    url: 'https://www.theguardian.com/education/2019/aug/27/highschoolers-phones-yondr-distraction',
  },
  {
    outlet: 'Rolling Stone',
    date: '2018-02-28',
    excerpt: 'Artists to Fans: Put Your Phones Away!',
    url: 'https://www.rollingstone.com/music/music-features/artists-to-fans-put-your-phones-away-202263/',
  },
  {
    outlet: 'The Washington Post',
    date: '2018-02-05',
    excerpt: 'This simple solution to smartphone addiction is now used in over 600…',
    url: 'https://www.washingtonpost.com/news/inspired-life/wp/2018/02/05/this-millennial-discovered-a-surprisingly-simple-solution-to-smartphone-addiction-schools-love-it/',
  },
  {
    outlet: 'The New York Times',
    date: '2016-10-15',
    excerpt: 'Your Phone’s on Lockdown. Enjoy the Show…',
    url: 'https://www.nytimes.com/2016/10/16/technology/your-phones-on-lockdown-enjoy-the-show.html',
  },
];

/** Hand-picked features for the press spotlight modules (design: Media Spotlight / Press). */
export const featured = {
  hero: {
    outlet: 'CNN',
    title: 'Concert Crowds Have Become ‘a Sea Of Phones.’ But Is The Tide Turning?',
    url: 'https://www.cnn.com/world/no-phones-concert-crowds-harry-styles-spc',
  },
  podcast: {
    show: 'On with Kara Swisher',
    title: 'Put Your Phone Away: Yondr CEO on the Philosophy Behind Phone-Free Spaces',
    excerpt:
      'Kara and Graham talk about the push to ban phones from schools, the company’s success, and his philosophical take on smartphones, social media and technology.',
    url: 'https://open.spotify.com/episode/5UOBjR0sSlXjb23hfCQMog?si=0988443e9912401b',
    duration: '47:56',
  },
};

const byUrl = (u: string) => press.find((p) => p.url === u)!;
/** Cards used in the compact press grid on home, space and about pages. */
export const pressHighlights = {
  feature: byUrl('https://wapo.st/4iwcmM2'),
  bar: byUrl('https://www.axios.com/2026/04/05/phone-free-restaurants-bars-bans-restrictions-offline'),
  chronicle: byUrl(
    'https://www.houstonchronicle.com/opinion/editorials/article/texas-cellphone-ban-schools-legislature-hisd-20192779.php',
  ),
  cards: [
    byUrl('https://www.cnn.com/2024/09/03/us/back-to-school-bans-cell-phones-hoodies-mirrors/index.html'),
    byUrl('/files/forbes-yondr.pdf'),
    byUrl('https://www.vox.com/24105235/phones-kids-schools-ban-yondr-pouch-smartphones'),
    byUrl('https://www.wsj.com/tech/personal-tech/tech-addiction-solution-yondr-phones-1c5629f8'),
  ],
};
