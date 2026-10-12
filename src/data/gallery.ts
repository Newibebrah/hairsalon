export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'waves',
    src: '/images/hair-la-venia/result-waves.svg',
    alt: 'Long glossy waves hairstyle',
    category: 'Waves',
  },
  {
    id: 'updo',
    src: '/images/hair-la-venia/result-updo.svg',
    alt: 'Elegant formal updo hairstyle',
    category: 'Updo',
  },
  {
    id: 'straight',
    src: '/images/hair-la-venia/result-straight.svg',
    alt: 'Long smooth straight hairstyle',
    category: 'Straight',
  },
  {
    id: 'curls',
    src: '/images/hair-la-venia/result-curls.svg',
    alt: 'Defined curls with volume',
    category: 'Curls',
  },
  {
    id: 'layers',
    src: '/images/hair-la-venia/result-layers.svg',
    alt: 'Soft layered brunette hairstyle',
    category: 'Layers',
  },
];