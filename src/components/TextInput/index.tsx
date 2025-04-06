import React, { FC } from 'react';
import styles from './TextInput.module.scss'

interface TextInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TextInput: FC<TextInputProps> = ({
 label,
 name,
 type = 'text',
 placeholder,
 error,
 required = false,
 disabled = false,
 className = '',
 ...props
}) => {
  return (
   <div className={`${styles.inputWrapper} ${className}`}>
    { label && (
        <label htmlFor={name} className={styles.label}>
            {label} {required && <span className={styles.required}>*</span>}
        </label>
    )}
    <input 
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
   </div>
  )
};
