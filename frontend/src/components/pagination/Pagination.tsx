import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import styles from './pagination.module.css';

interface Props {
    last_page: number | undefined;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
}

const Pagination = (props: Props) => {

    function prevPage(): void {
        if (props.page !== 1) {
            props.setPage(prev => prev - 1);
        }
    }

    function nextPage(): void {
        if (props.page !== props.last_page) {
            props.setPage(prev => prev + 1);
        }
    }

    return (
        <>
            {
                props.last_page !== 1 &&
                <div className={styles.offers__pagination}>
                    <button onClick={prevPage} title='Poprzednia strona' aria-disabled={props.page === 1} disabled={props.page === 1} className={`${styles.pagination__button} ${props.page === 1 && styles.pagination__button_disabled}`}>
                        <GrLinkPrevious />
                    </button>
                    <p className={styles.pagination__text}>{props.page}/{props.last_page}</p>
                    <button onClick={nextPage} title='Następna strona' aria-disabled={props.page === props.last_page} disabled={props.page === props.last_page} className={`${styles.pagination__button} ${props.page === props.last_page && styles.pagination__button_disabled}`}>
                        <GrLinkNext />
                    </button>
                </div>
            }
        </>
    )
}

export default Pagination
