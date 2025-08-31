import React from 'react';
import { Button } from '@/shared/ui/Button';
import EditIcon from '@/assets/icons/Edit.svg?react';
import styles from './Company.module.scss';

type CompanyProps = {
  agreementNumber: string;
  agreementDay: string;
  businessEntity: string;
  companyType: string;
};

export const Company: React.FC<CompanyProps> = (props) => {
  const { agreementNumber, agreementDay, businessEntity, companyType } = props;

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Company Details</h2>
        <Button variant="secondary" leftIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
      <div className={styles.detailsGrid}>
        <div className={styles.row}>
          <div className={styles.label}>Agreement:</div>
          <div className={styles.value}>
            {agreementNumber}
            <span className={styles.separator}>/</span>
            <span className={styles.agreementDate}>{agreementDay}</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Business entity:</div>
          <div className={styles.value}>{businessEntity}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Company type:</div>
          <div className={styles.value}>{companyType}</div>
        </div>
      </div>
    </section>
  );
};
