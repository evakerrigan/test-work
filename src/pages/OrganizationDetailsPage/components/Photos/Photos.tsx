import React from 'react';
import { Button } from '@/shared/ui/Button';
import AddIcon from '@/assets/icons/Add.svg?react';
import TrashIcon from '@/assets/icons/Trash.svg?react';
import styles from './Photos.module.scss';

type PhotosProps = {
  title: string;
  photos: string[];
};

export const Photos: React.FC<PhotosProps> = ({ title, photos }) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Photos</h2>
        <Button variant="secondary" leftIcon={<AddIcon />}>
          Add
        </Button>
      </div>
      <div className={styles.photosGrid}>
        {photos.map((photo, index) => {
          const isLocalImage = photo.startsWith('/src/assets/');

          return (
            <div className={styles.photoItem} key={index}>
              {isLocalImage ? (
                <img
                  src={photo}
                  alt={`${title} - Photo ${index + 1}`}
                  className={styles.photoImg}
                />
              ) : (
                <div className={styles.photoPlaceholder}>Photo {index + 1}</div>
              )}
              <button
                className={styles.photoDelete}
                aria-label={`Delete photo ${index + 1}`}
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
