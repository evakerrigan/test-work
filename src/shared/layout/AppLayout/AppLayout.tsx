import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <main className={styles.appLayout__content}>
        <Outlet />
      </main>
    </div>
  );
};
