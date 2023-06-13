import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import styles from './Input.module.scss';

type InputProps = {
 label: string;
 id?: string;
 placeholder: string;
 value?: string;
 type: string;
 required?: boolean;
 register?: UseFormRegister<FieldValues>;

}

const Input: React.FC<InputProps> = ({ id, label, placeholder, value, type, required, register }) => {
 return (
  <div className={styles.input}>
   <label htmlFor={id}>{label}</label>
   <input
    type={type}
    id={id}
    placeholder={placeholder}
    required={required}
    {...register(id, { required })}
   />
  </div>
 );
}

export default Input;