import { createBrowserRouter } from 'react-router-dom';
import {
  OrganizationsListPage,
  OrganizationDetailsPage,
  ContractorsPage,
  ClientsPage,
} from '@/pages';
import { AppLayout } from '@/shared/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <OrganizationsListPage />,
      },
      {
        path: 'organizations',
        element: <OrganizationsListPage />,
      },
      {
        path: 'organizations/:id',
        element: <OrganizationDetailsPage />,
      },
      {
        path: 'contractors',
        element: <ContractorsPage />,
      },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
    ],
  },
]);
