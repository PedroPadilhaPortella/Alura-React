import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.css';

export default function MenuLink(props) {
  return (
    <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.linkDestacado : ""}`}
      to={props.to} end>
      {props.children}
    </NavLink>
  );
}