import React, { useState } from 'react';
import { LogoTreeIcon, Button, Input } from '@/shared/ui';
import styles from './SignInPage.module.scss';
import { authStore } from '@/features/authentication';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const SignInPage = observer(() => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authStore.signIn(name);
      navigate('/');
    } catch {
      // noop: error will be reflected from store if needed
    }
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__container}>
        <div className={styles.signIn__logo}>
          <LogoTreeIcon size={64} className={styles.signIn__icon} />
        </div>

        <h1 className={styles.signIn__title}>Sign In</h1>

        <form onSubmit={handleSubmit} className={styles.signIn__form}>
          <div className={styles.signIn__field}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <Button type="submit" disabled={authStore.isLoading}>
            {authStore.isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
});
