import Login from '../components/user/login/Login';
import styles from './Page.module.scss';

const LoginPage = () => {
 return (
  <div className={styles.page}>
   <Login />
  </div>
 );
}

export default LoginPage;