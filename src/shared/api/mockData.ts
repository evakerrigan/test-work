/**
 * МОКОВЫЕ ДАННЫЕ ДЛЯ ЗАМЕНЫ API
 *
 * Этот файл содержит все данные, которые раньше приходили с API
 * allfuneral.com. Используется вместо реального API, так как доступ
 * к нему был отключен.
 */

import type { CompanyDto } from '@/features/companies/api';
import type { ContactDto } from '@/features/contacts/api';

// Моковый токен авторизации
export const MOCK_AUTH_TOKEN = 'mock_token_12345_allfuneral_test';

// Моковые контакты
export const MOCK_CONTACTS: Record<string, ContactDto> = {
  '1': {
    id: '1',
    lastname: 'Rosenberg',
    firstname: 'David',
    phone: '+1 702 555 2345',
    email: 'david_rosenberg88@gmail.com',
    createdAt: '2024-12-03T10:00:00Z',
    updatedAt: '2024-12-03T10:00:00Z',
  },
  '2': {
    id: '2',
    lastname: 'Johnson',
    firstname: 'Sarah',
    phone: '+1 (555) 234-5678',
    email: 'contact@heavenlygates.com',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  '3': {
    id: '3',
    lastname: 'Brown',
    firstname: 'Michael',
    phone: '+1 (555) 345-6789',
    email: 'help@serenitychapel.com',
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
  },
  '4': {
    id: '4',
    lastname: 'Davis',
    firstname: 'Emily',
    phone: '+1 (555) 456-7890',
    email: 'info@peacefulvalley.org',
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-20T10:00:00Z',
  },
  '5': {
    id: '5',
    lastname: 'Wilson',
    firstname: 'Robert',
    phone: '+1 (555) 567-8901',
    email: 'admin@gracememorial.com',
    createdAt: '2024-05-12T10:00:00Z',
    updatedAt: '2024-05-12T10:00:00Z',
  },
};

// Моковые компании
export const MOCK_COMPANIES: Record<string, CompanyDto> = {
  '12': {
    id: '12',
    contactId: '1',
    name: 'Eternal Rest Funeral Home',
    shortName: 'ERFH',
    businessEntity: 'Partnership',
    contract: {
      no: '1624/2-24',
      issue_date: '03.12.2024',
    },
    type: ['funeral_home', 'logistics_services'],
    status: 'active',
    photos: [
      {
        name: 'image1.png',
        filepath: '/src/assets/images/image1.png',
        thumbpath: '/src/assets/images/image1.png',
        createdAt: '2024-12-03T10:00:00Z',
      },
      {
        name: 'image2.png',
        filepath: '/src/assets/images/image2.png',
        thumbpath: '/src/assets/images/image2.png',
        createdAt: '2024-12-03T10:05:00Z',
      },
      {
        name: 'image3.png',
        filepath: '/src/assets/images/image3.png',
        thumbpath: '/src/assets/images/image3.png',
        createdAt: '2024-12-03T10:10:00Z',
      },
    ],
    createdAt: '2024-12-03T10:00:00Z',
    updatedAt: '2024-12-03T10:00:00Z',
  },
  '2': {
    id: '2',
    contactId: '2',
    name: 'Heavenly Gates Memorial Services',
    shortName: 'HGMS',
    businessEntity: 'Corporation',
    contract: {
      no: 'AGR-2024-002',
      issue_date: '2024-02-10',
    },
    type: ['funeral_home'],
    status: 'active',
    photos: [
      {
        name: 'image2.png',
        filepath: '/src/assets/images/image2.png',
        thumbpath: '/src/assets/images/image2.png',
        createdAt: '2024-12-03T10:05:00Z',
      },
      {
        name: 'image3.png',
        filepath: '/src/assets/images/image3.png',
        thumbpath: '/src/assets/images/image3.png',
        createdAt: '2024-12-03T10:10:00Z',
      },
    ],
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  '3': {
    id: '3',
    contactId: '3',
    name: 'Serenity Funeral Chapel',
    shortName: 'SFC',
    businessEntity: 'Partnership',
    contract: {
      no: 'AGR-2024-003',
      issue_date: '2024-03-05',
    },
    type: ['funeral_home'],
    status: 'active',
    photos: [
      {
        name: 'image3.png',
        filepath: '/src/assets/images/image3.png',
        thumbpath: '/src/assets/images/image3.png',
        createdAt: '2024-12-03T10:10:00Z',
      },
      {
        name: 'image1.png',
        filepath: '/src/assets/images/image1.png',
        thumbpath: '/src/assets/images/image1.png',
        createdAt: '2024-12-03T10:00:00Z',
      },
      {
        name: 'image2.png',
        filepath: '/src/assets/images/image2.png',
        thumbpath: '/src/assets/images/image2.png',
        createdAt: '2024-12-03T10:05:00Z',
      },
    ],
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
  },
  '4': {
    id: '4',
    contactId: '4',
    name: 'Peaceful Valley Cemetery',
    shortName: 'PVC',
    businessEntity: 'Non-Profit',
    contract: {
      no: 'AGR-2024-004',
      issue_date: '2024-04-20',
    },
    type: ['burial_care_contractor'],
    status: 'active',
    photos: [
      {
        name: 'image3.png',
        filepath: '/src/assets/images/image3.png',
        thumbpath: '/src/assets/images/image3.png',
        createdAt: '2024-12-03T10:10:00Z',
      },
      {
        name: 'image1.png',
        filepath: '/src/assets/images/image1.png',
        thumbpath: '/src/assets/images/image1.png',
        createdAt: '2024-12-03T10:00:00Z',
      },
      {
        name: 'image2.png',
        filepath: '/src/assets/images/image2.png',
        thumbpath: '/src/assets/images/image2.png',
        createdAt: '2024-12-03T10:05:00Z',
      },
    ],
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-20T10:00:00Z',
  },
  '5': {
    id: '5',
    contactId: '5',
    name: 'Grace Memorial Park',
    shortName: 'GMP',
    businessEntity: 'LLC',
    contract: {
      no: 'AGR-2024-005',
      issue_date: '2024-05-12',
    },
    type: ['burial_care_contractor'],
    status: 'active',
    photos: [
      {
        name: 'image3.png',
        filepath: '/src/assets/images/image3.png',
        thumbpath: '/src/assets/images/image3.png',
        createdAt: '2024-12-03T10:10:00Z',
      },
      {
        name: 'image2.png',
        filepath: '/src/assets/images/image2.png',
        thumbpath: '/src/assets/images/image2.png',
        createdAt: '2024-12-03T10:05:00Z',
      },
    ],
    createdAt: '2024-05-12T10:00:00Z',
    updatedAt: '2024-05-12T10:00:00Z',
  },
};

// Вспомогательная функция для имитации задержки сети
export const mockDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
