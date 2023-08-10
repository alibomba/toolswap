

import { ReactNode } from 'react';
import styles from './popup.module.css';

interface Props {
    children: ReactNode;
    type: 'good' | 'bad';
    active: boolean;
};

const Popup = ({ children, type, active }: Props) => {
    return (
        <div role='alert' aria-live={active ? 'assertive' : 'off'} className={`${styles.popup} ${type === 'good' ? styles.popup_good : styles.popup_bad} ${active && styles.popup_active}`}>
            {children}
        </div>
    )
}

export default Popup
