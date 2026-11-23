// National summary figures, verbatim from the hub post
// /school-phone-bans (published 2025-06-15):
// "As of May 2025, 20 U.S. states have implemented statewide cellphone policies—including
// nine with full bell-to-bell restrictions, such as Alabama, New York, Virginia, Georgia, and Oklahoma."
export interface NationalSummaryItem {
  value: string;
  label: string;
}
export interface NationalSummary {
  asOf: string;
  items: NationalSummaryItem[];
}

export const nationalSummary: NationalSummary | null = {
  asOf: 'May 2025',
  items: [
    { value: '20 U.S. states', label: 'have implemented statewide cellphone policies' },
    { value: 'Nine', label: 'with full bell-to-bell restrictions' },
  ],
};

// States with full-day cellphone bans (as of May 2025), as listed on the hub.
export const fullDayBanStates: string[] = [
  'Alabama',
  'Arkansas',
  'Georgia',
  'New York',
  'North Dakota',
  'Oklahoma',
  'South Carolina',
  'Virginia',
  'West Virginia',
];
