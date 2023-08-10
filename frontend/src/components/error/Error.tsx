

import styles from './error.module.css';

interface Props {
    children: string | null;
}

const Error = ({ children }: Props) => {
    if (children) {
        return <p className={styles.error} role='alert' aria-live='assertive'>{children}</p>
    }
    else {
        return <></>
    }
}

export default Error;
