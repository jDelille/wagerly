import { ChangeEventHandler } from "react";
import styles from './Input.module.scss';

type InputProps = {
 label: string;
 id: string;
 onChange: ChangeEventHandler<HTMLInputElement>
 placeholder: string;
 value: string;
 type: string;
 required?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label, onChange, placeholder, value, type, required }) => {
 return (
  <div className={styles.input}>
   <label htmlFor={id}>{label}</label>
   <input
    type={type}
    id={id}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    required={required}
   />
  </div>
 );
}

export default Input;