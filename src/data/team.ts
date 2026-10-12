export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  specialization: string;
  instagram?: string;
  facebook?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'stylist-01',
    name: 'Putri Amalia',
    role: 'Senior Stylist',
    image: '/images/hair-la-venia/team-stylist-01.svg',
    specialization: 'Color Specialist & Keratin',
    instagram: '#',
    facebook: '#',
  },
  {
    id: 'stylist-02',
    name: 'Dewi Sartika',
    role: 'Creative Director',
    image: '/images/hair-la-venia/team-stylist-02.svg',
    specialization: 'Bridal & Updo Expert',
    instagram: '#',
    facebook: '#',
  },
  {
    id: 'stylist-03',
    name: 'Sari Indah',
    role: 'Hair Therapist',
    image: '/images/hair-la-venia/team-stylist-03.svg',
    specialization: 'Hair Spa & Treatment',
  },
  {
    id: 'stylist-04',
    name: 'Rina Kusuma',
    role: 'Junior Stylist',
    image: '/images/hair-la-venia/team-stylist-04.svg',
    specialization: 'Cutting & Blow Dry',
  },
];