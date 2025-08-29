import React from 'react';
import styles from './MainMenu.module.scss';
import {
  LogoTreeIcon,
  CompanyIcon,
  SearchIcon,
  SettingsIcon,
  SignOutIcon,
} from '@/shared/ui';

interface MainMenuItem {
  id: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const mainMenuItems: MainMenuItem[] = [
  {
    id: 'dashboard',
    icon: <LogoTreeIcon size={18} />,
  },
  {
    id: 'organizations',
    icon: <CompanyIcon size={18} />,
    isActive: true,
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
  return (
    <div className={styles.mainMenu}>
      <div className={styles.mainMenu__top}>
        {mainMenuItems.slice(0, 3).map((item) => (
          <button
            key={item.id}
            className={`${styles.mainMenu__item} ${
              item.isActive ? styles['mainMenu__item--active'] : ''
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className={styles.mainMenu__bottom}>
        {mainMenuItems.slice(3).map((item) => (
          <button key={item.id} className={styles.mainMenu__item}>
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
