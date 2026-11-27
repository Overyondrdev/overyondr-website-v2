// Yondr product catalogue, migrated from the product pages on the live overyondr.com site
// (/student-pouch, /medical-pouch, ... and /product-photos). Those pages carry only a
// product photo and a page title, so there is no source copy for description,
// tagline or features yet; `description` is left empty until real copy is supplied.

export interface Product {
  slug: string;
  name: string;
  category: 'pouch' | 'unlocking' | 'storage';
  tagline?: string;
  description: string[];
  features?: string[];
  /** File name inside src/assets/images/products/ */
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    slug: 'student-pouch',
    name: 'Student Pouch',
    category: 'pouch',
    description: [],
    image: 'student-pouch.jpg',
    imageAlt: 'Grey Yondr Student Pouch with a lime-green lining, open with a smartphone inside',
  },
  {
    slug: 'medical-pouch',
    name: 'Medical Pouch',
    category: 'pouch',
    description: [],
    image: 'medical-pouch.jpg',
    imageAlt: 'Dark grey Yondr Medical Pouch with a black lining and green Yondr logo',
  },
  {
    slug: 'id-pouch',
    name: 'ID Pouch',
    category: 'pouch',
    description: [],
    image: 'id-pouch.jpg',
    imageAlt: 'Front and back of the grey Yondr ID Pouch, with a clear ID window on the back',
  },
  {
    slug: 'handheld-magnet',
    name: 'Handheld Magnet',
    category: 'unlocking',
    description: [],
    image: 'handheld-magnet.jpg',
    imageAlt: 'Dark grey Yondr Handheld Magnet with a handle cut-out and a metal unlocking disc',
  },
  {
    slug: 'magnet-base',
    name: 'Magnet Base',
    category: 'unlocking',
    description: [],
    image: 'magnet-base.jpg',
    imageAlt: 'Round grey Yondr Magnet Base with a metal unlocking disc in the centre',
  },
  {
    slug: 'lockbox',
    name: 'Lockbox',
    category: 'storage',
    description: [],
    image: 'lockbox.jpg',
    imageAlt: 'Dark grey Yondr Lockbox with a green tree logo and a metal latch',
  },
  {
    slug: 'storage-tote',
    name: 'Storage Tote',
    category: 'storage',
    description: [],
    image: 'storage-tote.jpg',
    imageAlt: 'Navy Yondr Storage Tote with lime-green handles and a tree logo',
  },
  {
    slug: 'storage-hamper',
    name: 'Storage Hamper',
    category: 'storage',
    description: [],
    image: 'storage-hamper.jpg',
    imageAlt: 'Tall black Yondr Storage Hamper with green trim and a tree logo',
  },
  {
    slug: 'pouch-rack',
    name: 'Pouch Rack',
    category: 'storage',
    description: [],
    image: 'pouch-rack.jpg',
    imageAlt: 'Grey hanging Yondr Pouch Rack with 30 numbered clear pockets holding pouches',
  },
];
