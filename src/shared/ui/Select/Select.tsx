import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Select.module.scss';

type Option = { label: string; value: string | number };

type SelectVariant = 'business' | 'company';

type ChangeEventLike<T> = { target: { value: T } };

type SelectProps = {
  className?: string;
  options?: Option[];
  placeholder?: string;
  variant?: SelectVariant;
  value?: string | number | Array<string | number>;
  disabled?: boolean;
  onChange?: (
    e: ChangeEventLike<string | number | Array<string | number>>
  ) => void;
};

type LabelAttrs = Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'>;

export const Select: React.FC<SelectProps & LabelAttrs> = (props) => {
  const {
    className = '',
    options = [],
    placeholder = 'Select...',
    variant = 'business',
    disabled = false,
    value,
    onChange,
    ...rest
  } = props;

  const isMulti = variant === 'company';
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLabelElement | null>(null);

  const selectedValues = useMemo<Array<string | number>>(() => {
    if (Array.isArray(value)) return value as Array<string | number>;
    if (typeof value === 'undefined' || value === null) return [];
    return [value as string | number];
  }, [value]);

  const selectedLabels = useMemo(() => {
    if (!selectedValues.length) return '';
    const map = new Map(options.map((o) => [String(o.value), o.label]));
    return selectedValues
      .map((v) => map.get(String(v)) ?? String(v))
      .join(', ');
  }, [selectedValues, options]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((s) => !s);
  };

  const emitChange = (newValues: Array<string | number>) => {
    if (onChange) {
      const payload = (isMulti ? newValues : (newValues[0] ?? '')) as
        | Array<string | number>
        | string
        | number;
      const synthetic: ChangeEventLike<
        Array<string | number> | string | number
      > = { target: { value: payload } };
      onChange(synthetic);
    }
  };

  const onOptionClick = (val: string | number) => {
    if (isMulti) {
      const set = new Set(selectedValues.map(String));
      if (set.has(String(val))) set.delete(String(val));
      else set.add(String(val));
      emitChange(Array.from(set.values()) as Array<string | number>);
    } else {
      emitChange([val]);
      setOpen(false);
    }
  };

  const containerClassName = [
    styles.select,
    disabled ? styles['select--disabled'] : '',
    open ? styles['select--open'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <label
      ref={containerRef}
      className={containerClassName}
      aria-disabled={disabled}
      {...rest}
    >
      <div
        className={styles['select__display']}
        onClick={toggleOpen}
        tabIndex={0}
      >
        <span className={styles['select__value']}>
          {selectedLabels || placeholder}
        </span>
        <span
          className={[
            styles['select__icon'],
            open ? styles['select__icon--up'] : '',
          ]
            .join(' ')
            .trim()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 9 L12 15 L18 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </div>

      {open ? (
        <ul
          className={styles['select__menu']}
          role="listbox"
          aria-multiselectable={isMulti}
        >
          {options.map((opt) => {
            const isSelected = selectedValues
              .map(String)
              .includes(String(opt.value));
            return (
              <li
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                className={[
                  styles['select__option'],
                  isSelected ? styles['select__option--selected'] : '',
                ]
                  .join(' ')
                  .trim()}
                onClick={() => onOptionClick(opt.value)}
              >
                {isMulti ? (
                  <label className={styles['select__optionContent']}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className={styles['select__checkbox']}
                    />
                    <span>{opt.label}</span>
                  </label>
                ) : (
                  <span>{opt.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </label>
  );
};
