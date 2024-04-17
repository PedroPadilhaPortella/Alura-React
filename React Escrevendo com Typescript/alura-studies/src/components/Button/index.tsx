import { Component, ReactElement } from 'react';
import styles from './Botao.module.scss';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  children: ReactElement | string;
  onClick?: () => void,
}

export default class Button extends Component<ButtonProps> {
  render() {
    const { type, children, onClick } = this.props;

    return (
      <button type={type} className={styles.botao} onClick={onClick}>
        {children}
      </button>
    );
  }
}
