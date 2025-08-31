import React, { useMemo, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import EditIcon from '@/assets/icons/Edit.svg?react';
import styles from './Company.module.scss';
import { companyStore, type CompanyTypeCode } from '@/features/companies';
import { observer } from 'mobx-react-lite';
import { formatIsoToDDMMYYYY, parseDDMMYYYYToIso } from '@/shared/utils';

type CompanyProps = {
  agreementNumber: string;
  agreementDay: string;
  businessEntity: string;
  companyType: string;
};

export const Company: React.FC<CompanyProps> = observer((props) => {
  const { agreementNumber, agreementDay, businessEntity, companyType } = props;

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    contractNo: agreementNumber,
    contractDate: agreementDay,
    businessEntity: businessEntity,
    types: [] as CompanyTypeCode[],
  });

  React.useEffect(() => {
    if (companyStore.company) {
      setForm({
        contractNo: companyStore.company.contract.no,
        contractDate: formatIsoToDDMMYYYY(
          companyStore.company.contract.issue_date
        ),
        businessEntity: companyStore.company.businessEntity,
        types: companyStore.company.type,
      });
    }
  }, [companyStore.company]);

  const businessOptions = useMemo(
    () => [
      { label: 'Partnership', value: 'Partnership' },
      { label: 'Corporation', value: 'Corporation' },
      { label: 'LLC', value: 'LLC' },
      { label: 'Non-Profit', value: 'Non-Profit' },
    ],
    []
  );

  const companyTypeOptions = useMemo(
    () => [
      { label: 'Funeral Home', value: 'funeral_home' },
      { label: 'Logistics services', value: 'logistics_services' },
      { label: 'Burial care contractor', value: 'burial_care_contractor' },
    ],
    []
  );

  const onSave = async () => {
    if (!companyStore.company) return;
    await companyStore.update(companyStore.company.id, {
      businessEntity: form.businessEntity,
      contract: {
        no: form.contractNo,
        issue_date: parseDDMMYYYYToIso(form.contractDate),
      },
      type: form.types,
    });
    setIsEdit(false);
  };

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Company Details</h2>
        {isEdit ? (
          <div>
            <Button
              variant="secondary"
              onClick={onSave}
              disabled={companyStore.isSaving}
            >
              Save changes
            </Button>
            <Button
              variant="flattened"
              onClick={() => setIsEdit(false)}
              className={styles.cancelBtn}
            >
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
            <div className={styles.label}>Agreement number:</div>
            <Input
              value={form.contractNo}
              onChange={(e) =>
                setForm((s) => ({ ...s, contractNo: e.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Date:</div>
            <Input
              value={form.contractDate}
              onChange={(e) =>
                setForm((s) => ({ ...s, contractDate: e.target.value }))
              }
            />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Business entity:</div>
            <Select
              options={businessOptions}
              value={form.businessEntity}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  businessEntity: String(e.target.value),
                }))
              }
            />
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Company type:</div>
            <Select
              variant="company"
              options={companyTypeOptions}
              value={form.types}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  types: Array.isArray(e.target.value)
                    ? ((e.target.value as Array<string | number>).map(
                        String
                      ) as CompanyTypeCode[])
                    : [String(e.target.value) as CompanyTypeCode],
                }))
              }
            />
          </div>
        </div>
      ) : (
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
      )}
    </section>
  );
});
