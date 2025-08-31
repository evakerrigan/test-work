import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import EditIcon from '@/assets/icons/Edit.svg?react';
import styles from './Contacts.module.scss';
import { contactStore } from '@/features/contacts';
import { observer } from 'mobx-react-lite';

type ContactsProps = {
  responsiblePerson: string;
  phone: string;
  email: string;
};

export const Contacts: React.FC<ContactsProps> = observer((props) => {
  const { responsiblePerson, phone, email } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phone: phone,
    email: email,
  });

  React.useEffect(() => {
    if (contactStore.contact) {
      setForm({
        firstname: contactStore.contact.firstname,
        lastname: contactStore.contact.lastname,
        phone: contactStore.contact.phone,
        email: contactStore.contact.email,
      });
    }
  }, [contactStore.contact]);

  const onSave = async () => {
    if (!contactStore.contact) return;
    await contactStore.update(contactStore.contact.id, {
      firstname: form.firstname,
      lastname: form.lastname,
      phone: form.phone,
      email: form.email,
    });
    setIsEdit(false);
  };

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Contacts</h2>
        {isEdit ? (
          <div>
            <Button
              variant="secondary"
              onClick={onSave}
              disabled={contactStore.isSaving}
            >
              Save changes
            </Button>
            <Button variant="flattened" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="flattened"
            leftIcon={<EditIcon />}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
      </div>
      {isEdit ? (
        <div className={styles.detailsGrid}>
          <div className={styles.row}>
            <div className={styles.label}>Responsible person:</div>
            <Input
              value={`${form.firstname} ${form.lastname}`.trim()}
              onChange={(e) => {
                const [first, ...rest] = e.target.value.split(' ');
                setForm((s) => ({
                  ...s,
                  firstname: first ?? '',
                  lastname: rest.join(' '),
                }));
              }}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Phone number:</div>
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone: e.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>E-mail:</div>
            <Input
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
        </div>
      ) : (
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
      )}
    </section>
  );
});
