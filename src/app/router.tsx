import { createBrowserRouter } from 'react-router-dom';
import {
  OrganizationsListPage,
  OrganizationDetailsPage,
  ContractorsPage,
  ClientsPage,
  SignInPage,
  SettingsPage,
  SearchPage,
} from '@/pages';
import { AppLayout } from '@/shared/layout';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
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
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
