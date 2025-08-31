import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './MainMenu.module.scss';
import {
  LogoTreeIcon,
  OrganizationIcon,
  SearchIcon,
  SettingsIcon,
  SignOutIcon,
} from '@/shared/ui';
import { authStore } from '@/features/authentication';

interface MainMenuItem {
  id: string;
  icon: React.ReactNode;
}

const mainMenuItems: MainMenuItem[] = [
  {
    id: 'organizations',
    icon: <OrganizationIcon size={18} />,
  },
  {
    id: 'search',
    icon: <SearchIcon size={18} />,
  },
  {
    id: 'settings',
    icon: <SettingsIcon size={18} />,
  },
  {
    id: 'logout',
    icon: <SignOutIcon size={18} />,
  },
];

export const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/organizations'))
      return 'organizations';
    if (path === '/search') return 'search';
    if (path === '/settings') return 'settings';
    return 'organizations';
  };

  const handleItemClick = (itemId: string) => {
    switch (itemId) {
      case 'organizations':
        navigate('/organizations');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        authStore.signOut();
        navigate('/sign-in');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.mainMenu}>
      <div className={styles.mainMenu__top}>
        <Link to="/" className={styles.mainMenu__logo}>
          <LogoTreeIcon size={25} className={styles.mainMenu__icon} />
        </Link>

        {mainMenuItems.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`${styles.mainMenu__item} ${
              getActiveItem() === item.id
                ? styles['mainMenu__item--active']
                : ''
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className={styles.mainMenu__bottom}>
        {mainMenuItems.slice(2).map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`${styles.mainMenu__item} ${
              getActiveItem() === item.id
                ? styles['mainMenu__item--active']
                : ''
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
