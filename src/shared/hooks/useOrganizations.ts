import { type Organization } from '@/shared/types';

const mockOrganizations: Organization[] = [
  {
    id: 12,
    title: 'Eternal Rest Funeral Home',
    agreementNumber: '1624/2-24',
    agreementDay: '03.12.2024',
    businessEntity: 'Partnership',
    companyType: 'Funeral Home, Logistics services',
    responsiblePerson: 'David Rosenberg',
    phone: '+1 702 555 2345',
    email: 'david_rosenberg88@gmail.com',
    photos: [
      '/src/assets/images/image1.png',
      '/src/assets/images/image2.png',
      '/src/assets/images/image3.png',
    ],
  },
  {
    id: 2,
    title: 'Heavenly Gates Memorial Services',
    agreementNumber: 'AGR-2024-002',
    agreementDay: '2024-02-10',
    businessEntity: 'Corporation',
    companyType: 'Memorial Services',
    responsiblePerson: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    email: 'contact@heavenlygates.com',
    photos: [
      'https://example.com/photos/heavenly-gates-1.jpg',
      'https://example.com/photos/heavenly-gates-2.jpg',
    ],
  },
  {
    id: 3,
    title: 'Serenity Funeral Chapel',
    agreementNumber: 'AGR-2024-003',
    agreementDay: '2024-03-05',
    businessEntity: 'Partnership',
    companyType: 'Funeral Chapel',
    responsiblePerson: 'Michael Brown',
    phone: '+1 (555) 345-6789',
    email: 'help@serenitychapel.com',
    photos: [
      'https://example.com/photos/serenity-chapel-1.jpg',
      'https://example.com/photos/serenity-chapel-2.jpg',
      'https://example.com/photos/serenity-chapel-3.jpg',
      'https://example.com/photos/serenity-chapel-4.jpg',
    ],
  },
  {
    id: 4,
    title: 'Peaceful Valley Cemetery',
    agreementNumber: 'AGR-2024-004',
    agreementDay: '2024-04-20',
    businessEntity: 'Non-Profit',
    companyType: 'Cemetery',
    responsiblePerson: 'Emily Davis',
    phone: '+1 (555) 456-7890',
    email: 'info@peacefulvalley.org',
    photos: [
      'https://example.com/photos/peaceful-valley-1.jpg',
      'https://example.com/photos/peaceful-valley-2.jpg',
    ],
  },
  {
    id: 5,
    title: 'Grace Memorial Park',
    agreementNumber: 'AGR-2024-005',
    agreementDay: '2024-05-12',
    businessEntity: 'LLC',
    companyType: 'Memorial Park',
    responsiblePerson: 'Robert Wilson',
    phone: '+1 (555) 567-8901',
    email: 'admin@gracememorial.com',
    photos: [
      'https://example.com/photos/grace-memorial-1.jpg',
      'https://example.com/photos/grace-memorial-2.jpg',
      'https://example.com/photos/grace-memorial-3.jpg',
    ],
  },
];

export const useOrganizations = () => {
  const organizations = mockOrganizations;

  const getOrganizationById = (id: number): Organization | undefined => {
    return organizations.find((org) => org.id === id);
  };

  return {
    organizations,
    getOrganizationById,
  };
};
