import React from 'react';
import { Button } from '@/shared/ui/Button';
import EditIcon from '@/assets/icons/Edit.svg?react';
import styles from './Contacts.module.scss';

type ContactsProps = {
  responsiblePerson: string;
  phone: string;
  email: string;
};

export const Contacts: React.FC<ContactsProps> = (props) => {
  const { responsiblePerson, phone, email } = props;

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Contacts</h2>
        <Button variant="secondary" leftIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
      <div className={styles.detailsGrid}>
        <div className={styles.row}>
          <div className={styles.label}>Responsible person:</div>
          <div className={styles.value}>{responsiblePerson}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Phone number:</div>
          <div className={styles.value}>{phone}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>E-mail:</div>
          <div className={styles.value}>{email}</div>
        </div>
      </div>
    </section>
  );
};
