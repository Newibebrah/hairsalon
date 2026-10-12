export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'shampoo-nourishing',
    name: 'Shampoo Nourishing',
    category: 'Shampoo',
    description: 'Shampoo pembersih lembut dengan ekstrak aloe vera dan minyak argan untuk kelembapan maksimal.',
    price: 185000,
    originalPrice: 220000,
    image: '/images/hair-la-venia/product-shampoo.svg',
    badge: 'Bestseller',
    inStock: true,
  },
  {
    id: 'hair-serum',
    name: 'Hair Serum Repair',
    category: 'Serum',
    description: 'Serum ringan untuk memperbaiki rambut rusak, mengurangi frizz, dan menambah kilau alami.',
    price: 245000,
    image: '/images/hair-la-venia/product-serum.svg',
    badge: 'Baru',
    inStock: true,
  },
  {
    id: 'hair-dryer-pro',
    name: 'Hair Dryer Professional',
    category: 'Alat Styling',
    description: 'Hair dryer ionik profesional dengan 3 setting panas dan 2 kecepatan angin untuk styling sempurna.',
    price: 890000,
    originalPrice: 1150000,
    image: '/images/hair-la-venia/product-hairdryer.svg',
    badge: 'Promo',
    inStock: true,
  },
  {
    id: 'hair-mask-intensive',
    name: 'Hair Mask Intensive',
    category: 'Treatment',
    description: 'Masker perawatan intensif dengan protein keratin dan vitamin E untuk rambut lembut dan sehat.',
    price: 195000,
    image: '/images/hair-la-venia/product-hairmask.svg',
    inStock: true,
  },
];

export const productCategories = ['Semua', 'Shampoo', 'Serum', 'Alat Styling', 'Treatment'];