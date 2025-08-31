import { useParams, useNavigate } from 'react-router-dom';
import { useOrganizations } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import EditIcon from '@/assets/icons/Edit.svg?react';
import TrashIcon from '@/assets/icons/Trash.svg?react';
import styles from './OrganizationDetailsPage.module.scss';
import { Company, Contacts, Photos } from './components';

export const OrganizationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrganizationById } = useOrganizations();

  const organization = getOrganizationById(Number(id));

  if (!organization) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Button
            variant="flattened"
            onClick={() => navigate('/organizations')}
          >
            ←
          </Button>
          <h1 className={styles.title}>Organization not found</h1>
        </div>
        <p className={styles.notFoundDescription}>
          Organization with ID {id} does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          variant="flattened"
          onClick={() => navigate('/organizations')}
          className={styles.backButton}
        >
          ←
        </Button>
        <h1 className={styles.title}>{organization.title}</h1>
        <div className={styles.headerActions}>
          <Button
            variant="icon"
            aria-label="Edit organization"
            leftIcon={<EditIcon />}
          >
            {''}
          </Button>
          <Button
            variant="icon"
            aria-label="Delete organization"
            leftIcon={<TrashIcon />}
          >
            {''}
          </Button>
        </div>
      </div>

      <Company
        agreementNumber={organization.agreementNumber}
        agreementDay={organization.agreementDay}
        businessEntity={organization.businessEntity}
        companyType={organization.companyType}
      />

      <Contacts
        responsiblePerson={organization.responsiblePerson}
        phone={organization.phone}
        email={organization.email}
      />

      {organization.photos && organization.photos.length > 0 && (
        <Photos title={organization.title} photos={organization.photos} />
      )}
    </div>
  );
};
