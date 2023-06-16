import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import styles from './Input.module.scss';

type InputProps = {
 label: string;
 id: string;
 placeholder: string;
 value: string;
 type: string;
 required?: boolean;
 register: UseFormRegister<FieldValues>;
 tabIndex: number;
 onChange?: (value: any) => void;

}

const Input: React.FC<InputProps> = ({ id, label, placeholder, value, type, required, register, tabIndex,
 onChange }) => {
 return (
  <div className={styles.input}>
   <label htmlFor={id}>{label}</label>
   <input
    type={type}
    id={id}
    placeholder={placeholder}
    required={required}
    tabIndex={tabIndex}
    {...register(id, { required })}
    onChange={onChange}

   />
  </div>
 );
}

export default Input;