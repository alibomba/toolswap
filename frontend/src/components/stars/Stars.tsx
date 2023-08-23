import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';


import styles from './stars.module.css';

interface Props {
    howMany: number;
    size: 'small' | 'big';
    setHowMany?: React.Dispatch<React.SetStateAction<number>>;
}

const Stars = ({ howMany, size, setHowMany }: Props) => {
    const [stars, setStars] = useState<React.ReactNode[] | undefined>(undefined);
    function changeStars(number: number) {
        setHowMany!(number);
    }


    useEffect(() => {
        const starsTemp: React.ReactNode[] = [
            <AiOutlineStar key={1} onClick={() => setHowMany && changeStars(1)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />,
            <AiOutlineStar key={2} onClick={() => setHowMany && changeStars(2)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />,
            <AiOutlineStar key={3} onClick={() => setHowMany && changeStars(3)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />,
            <AiOutlineStar key={4} onClick={() => setHowMany && changeStars(4)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />,
            <AiOutlineStar key={5} onClick={() => setHowMany && changeStars(5)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />
        ]
        for (let i = 0; i < howMany; i++) {
            starsTemp[i] = <AiFillStar key={i + 1} onClick={() => setHowMany && changeStars(i + 1)} className={`${size === 'small' && styles.star_small} ${size === 'big' && styles.star_big}`} />;
        }
        setStars(starsTemp);
    }, [howMany]);

    return (
        <div className={styles.stars}>
            {
                stars && stars.map(star => star)
            }
        </div>
    )
}

export default Stars
