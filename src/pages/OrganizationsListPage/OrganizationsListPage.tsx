import { useNavigate } from 'react-router-dom';
import { useOrganizations } from '@/shared/hooks';
import styles from './OrganizationsListPage.module.scss';

export const OrganizationsListPage = () => {
  const navigate = useNavigate();
  const { organizations } = useOrganizations();

  const handleOrganizationClick = (organizationId: number) => {
    navigate(`/organizations/${organizationId}`);
  };

  return (
    <div className={styles.organizationsPage}>
      <h1 className={styles.organizationsPage__title}>Organizations</h1>
      <div className={styles.organizationsPage__list}>
        {organizations.map((organization) => (
          <article
            key={organization.id}
            className={styles.orgCard}
            onClick={() => handleOrganizationClick(organization.id)}
          >
            <h3 className={styles.orgCard__title}>{organization.title}</h3>
            <p className={styles.orgCard__meta}>
              {organization.companyType} • {organization.businessEntity}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
