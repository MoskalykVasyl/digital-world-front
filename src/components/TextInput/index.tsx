import  { ChangeEvent, forwardRef } from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  value,
  onChange,
  ...props
}, ref) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
     <div className={styles.inputWrapper}>
      
     <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        ref={ref}
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        {...props}
      />
     </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

export default TextInput;
