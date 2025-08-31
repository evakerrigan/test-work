import React, { useState } from 'react';
import { LogoTreeIcon, Button, Input } from '@/shared/ui';
import styles from './SignInPage.module.scss';

export const SignInPage = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: sign in logic
    console.log('Sign in attempt with name:', name);
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__container}>
        <div className={styles.signIn__logo}>
          <LogoTreeIcon size={64} />
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

          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};
