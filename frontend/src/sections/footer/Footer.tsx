import { Link } from 'react-router-dom';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to='/'>
                <img className={styles.footer__logo} src="img/favicon.png" alt="logo firmy" />
            </Link>
            <nav className={styles.footer__nav}>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
                <a className={styles.footer__navLink} href="#">Lorem</a>
            </nav>
            <p className={styles.footer__copyright}>ToolSwap | Wszystkie prawa zastrzeżone &copy;</p>
        </footer>
    )
}

export default Footer
