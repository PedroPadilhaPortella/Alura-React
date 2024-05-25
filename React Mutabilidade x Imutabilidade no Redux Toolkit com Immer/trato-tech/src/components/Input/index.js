import { forwardRef } from 'react';
import styles from './Input.module.scss';

function Input({ value, onChange, ...props }, ref) {
  return (
    <input 
      ref={ref}
      className={styles.input} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      {...props}
    />
  );
}

export default forwardRef(Input);