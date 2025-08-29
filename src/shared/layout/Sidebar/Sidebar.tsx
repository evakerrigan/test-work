import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { MainMenu } from '../MainMenu';
import { CompanyIcon, ContractorIcon, UserIcon } from '@/shared/ui';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size: number }>;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'organizations',
    label: 'Organizations',
    path: '/organizations',
    icon: CompanyIcon,
  },
  {
    id: 'contractors',
    label: 'Contractors',
    path: '/contractors',
    icon: ContractorIcon,
  },
  {
    id: 'clients',
    label: 'Clients',
    path: '/clients',
    icon: UserIcon,
  },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <MainMenu />

      <div className={styles.sidebar__content}>
        <div className={styles.sidebar__header}>
          <div className={styles.sidebar__logo}>
            <div className={styles.sidebar__title}>
              <div className={styles['sidebar__title-main']}>
                Oak Tree Cemetery
              </div>
              <div className={styles['sidebar__title-sub']}>
                Process Manager
              </div>
            </div>
          </div>
        </div>

        <nav className={styles.sidebar__nav}>
          <ul className={styles.sidebar__list}>
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className={styles.sidebar__item}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.sidebar__link} ${
                        isActive ? styles['sidebar__link--active'] : ''
                      }`
                    }
                  >
                    <span className={styles.sidebar__icon}>
                      <IconComponent size={20} />
                    </span>
                    <span className={styles.sidebar__text}>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
