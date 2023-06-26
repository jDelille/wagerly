import Image from 'next/image';
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
 hasLogo?: boolean;
 logo?: string;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, value, type, required, register, tabIndex,
 onChange, hasLogo, logo }) => {
 return (
  <div className={styles.input}>
   {hasLogo && (
    <div className={styles.labelLogo}>
     <Image src={logo as string} alt='logo' width={20} height={20} />
     <label htmlFor={id}>{label}</label>
    </div>
   )}
   {!hasLogo && (
    <label htmlFor={id}>{label}</label>
   )}
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