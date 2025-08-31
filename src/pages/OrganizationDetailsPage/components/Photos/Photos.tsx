import React, { useRef } from 'react';
import { Button } from '@/shared/ui/Button';
import AddIcon from '@/assets/icons/Add.svg?react';
import TrashIcon from '@/assets/icons/Trash.svg?react';
import styles from './Photos.module.scss';
import { companyStore } from '@/features/companies';
import type { CompanyPhotoDto } from '@/features/companies';

type PhotosProps = { title: string; photos: CompanyPhotoDto[] };

export const Photos: React.FC<PhotosProps> = ({ title, photos }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onAddClick = () => {
    inputRef.current?.click();
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const inputElement = e.currentTarget;
    const file = inputElement.files?.[0];
    if (!companyStore.company) {
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    try {
      if (!file) {
        if (inputRef.current) inputRef.current.value = '';
        return;
      }
      await companyStore.uploadPhoto(companyStore.company.id, file);
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const onDelete = async (imageName: string) => {
    if (!companyStore.company) return;
    await companyStore.deletePhoto(companyStore.company.id, imageName);
  };

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Photos</h2>
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
          <Button
            variant="flattened"
            leftIcon={<AddIcon />}
            onClick={onAddClick}
          >
            Add
          </Button>
        </>
      </div>
      <div className={styles.photosGrid}>
        {photos.map((p, index) => {
          const src = p.thumbpath || p.filepath;
          const imageName = p.name;

          return (
            <div className={styles.photoItem} key={index}>
              {src ? (
                <img
                  src={src}
                  alt={`${title} - Photo ${index + 1}`}
                  className={styles.photoImg}
                />
              ) : (
                <div className={styles.photoPlaceholder}>Photo {index + 1}</div>
              )}
              <button
                className={styles.photoDelete}
                aria-label={`Delete photo ${index + 1}`}
                onClick={() => imageName && onDelete(imageName)}
              >
                <TrashIcon />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
