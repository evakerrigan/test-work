import { createBrowserRouter, Navigate } from 'react-router-dom';
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
import { observer } from 'mobx-react-lite';
import { authStore } from '@/features/authentication';

const RequireAuth = observer(
  ({ children }: { children: React.ReactElement }) => {
    if (!authStore.isAuthenticated) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  }
);

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
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
