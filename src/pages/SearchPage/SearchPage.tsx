import { useState } from 'react';
import styles from './SearchPage.module.scss';
import { SearchIcon } from '@/shared/ui/Icons';
import { Button } from '@/shared/ui/Button';

type SearchType = 'all' | 'organizations' | 'contractors' | 'clients';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<SearchType>('all');

  const getTypeLabel = (type: SearchType) => {
    switch (type) {
      case 'organizations':
        return 'Organizations';
      case 'contractors':
        return 'Contractors';
      case 'clients':
        return 'Clients';
      default:
        return 'All';
    }
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchPage__header}>
        <h1 className={styles.searchPage__title}>Search</h1>
        <p className={styles.searchPage__subtitle}>
          Find organizations, contractors or clients
        </p>
      </div>

      <div className={styles.searchPage__searchSection}>
        <div className={styles.searchPage__searchInput}>
          <input
            type="text"
            placeholder="Enter search query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchPage__input}
          />
          <Button variant="primary" className={styles.searchPage__searchButton}>
            <SearchIcon size={20} />
          </Button>
        </div>

        <div className={styles.searchPage__filters}>
          {(
            ['all', 'organizations', 'contractors', 'clients'] as SearchType[]
          ).map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'primary' : 'secondary'}
              onClick={() => setSelectedType(type)}
            >
              {getTypeLabel(type)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
