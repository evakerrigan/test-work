import React, { useState } from 'react';
import { Button, Input, Select } from '@/shared/ui';
import styles from './SettingsPage.module.scss';

export const SettingsPage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Administrator',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings update:', user);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change for:', user.name);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings__container}>
        <h1 className={styles.settings__title}>Settings</h1>

        <div className={styles.settings__content}>
          <div className={styles.settings__section}>
            <h2 className={styles.settings__sectionTitle}>User Information</h2>

            <form onSubmit={handleSubmit} className={styles.settings__form}>
              <div className={styles.settings__field}>
                <label className={styles.settings__label}>Name</label>
                <Input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className={styles.settings__field}>
                <label className={styles.settings__label}>Email</label>
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className={styles.settings__field}>
                <label className={styles.settings__label}>Phone</label>
                <Input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className={styles.settings__field}>
                <label className={styles.settings__label}>Role</label>
                <Select
                  value={user.role}
                  onChange={(e) =>
                    handleInputChange('role', String(e.target.value))
                  }
                  options={[
                    { label: 'Administrator', value: 'Administrator' },
                    { label: 'User', value: 'User' },
                    { label: 'Owner', value: 'Owner' },
                  ]}
                />
              </div>

              <Button type="submit">Update Information</Button>
            </form>
          </div>

          <div className={styles.settings__section}>
            <h2 className={styles.settings__sectionTitle}>Change Password</h2>

            <form
              onSubmit={handlePasswordChange}
              className={styles.settings__form}
            >
              <div className={styles.settings__field}>
                <label className={styles.settings__label}>
                  Current Password
                </label>
                <Input
                  type="password"
                  value={user.currentPassword}
                  onChange={(e) =>
                    handleInputChange('currentPassword', e.target.value)
                  }
                  placeholder="Enter current password"
                />
              </div>

              <div className={styles.settings__field}>
                <label className={styles.settings__label}>New Password</label>
                <Input
                  type="password"
                  value={user.newPassword}
                  onChange={(e) =>
                    handleInputChange('newPassword', e.target.value)
                  }
                  placeholder="Enter new password"
                />
              </div>

              <div className={styles.settings__field}>
                <label className={styles.settings__label}>
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  placeholder="Confirm new password"
                />
              </div>

              <Button type="submit">Change Password</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
