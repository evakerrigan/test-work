import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import EditIcon from '@/assets/icons/Edit.svg?react';
import TrashIcon from '@/assets/icons/Trash.svg?react';
import LeftIcon from '@/assets/icons/Left.svg?react';
import styles from './OrganizationDetailsPage.module.scss';
import { Company, Contacts, Photos } from './components';
import { observer } from 'mobx-react-lite';
import { companyStore } from '@/features/companies';
import { contactStore } from '@/features/contacts';
import { companyTypeCodeToLabel } from '@/shared/utils';

export const OrganizationDetailsPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id ?? '');
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (id) {
      companyStore.load(id).catch(() => void 0);
    }
  }, [id]);

  useEffect(() => {
    if (companyStore.company?.contactId) {
      contactStore.load(companyStore.company.contactId).catch(() => void 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyStore.company]);

  const organization = companyStore.company
    ? {
        id: numericId,
        title: companyStore.company.name,
        agreementNumber: companyStore.company.contract.no,
        agreementDay: new Date(
          companyStore.company.contract.issue_date
        ).toLocaleDateString('en-GB'),
        businessEntity: companyStore.company.businessEntity,
        companyType: companyStore.company.type
          .map((t) => companyTypeCodeToLabel(t))
          .join(', '),
        responsiblePerson: '',
        phone: '',
        email: '',
      }
    : undefined;

  if (!organization) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Button
            variant="flattened"
            onClick={() => navigate('/organizations')}
            aria-label="Назад"
          >
            <LeftIcon />
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
        <button
          onClick={() => navigate('/organizations')}
          className={styles.backButton}
          aria-label="Назад"
        >
          <LeftIcon />
        </button>
        <h1 className={styles.title}>{organization.title}</h1>
        <div className={styles.headerActions}>
          <Button
            variant="icon"
            aria-label="Edit organization"
            leftIcon={<EditIcon />}
            onClick={() => {
              setEditTitle(companyStore.company?.name ?? '');
              setIsEditTitleOpen(true);
            }}
          >
            {''}
          </Button>
          <Button
            variant="icon"
            aria-label="Delete organization"
            leftIcon={<TrashIcon />}
            onClick={() => setIsDeleteOpen(true)}
            className={styles.deleteIconButton}
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
        responsiblePerson={
          contactStore.contact
            ? `${contactStore.contact.firstname} ${contactStore.contact.lastname}`.trim()
            : organization.responsiblePerson
        }
        phone={contactStore.contact?.phone || organization.phone}
        email={contactStore.contact?.email || organization.email}
      />

      <Photos
        title={organization.title}
        photos={companyStore.company?.photos ?? []}
      />

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Remove the Organization?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
              No
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                if (!id) return;
                await companyStore.delete(id);
                navigate('/organizations');
              }}
              disabled={companyStore.isDeleting}
            >
              Yes, remove
            </Button>
          </>
        }
      >
        Are you sure you want to remove this Organization?
      </Modal>

      <Modal
        isOpen={isEditTitleOpen}
        onClose={() => setIsEditTitleOpen(false)}
        title={"Specify the Organization's name"}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditTitleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                if (!id) return;
                await companyStore.update(id, { name: editTitle });
                setIsEditTitleOpen(false);
              }}
              disabled={companyStore.isSaving}
            >
              Save changes
            </Button>
          </>
        }
      >
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Organization name"
        />
      </Modal>
    </div>
  );
});
