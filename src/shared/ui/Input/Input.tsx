import React from 'react';
import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  rightIcon?: React.ReactNode;
};

export const Input: React.FC<InputProps> = ({
  className = '',
  disabled,
  ...rest
}) => {
  const containerMods = [
    styles.input,
    disabled ? styles['input--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <label className={containerMods}>
      <input className={styles['input__field']} disabled={disabled} {...rest} />
    </label>
  );
};
