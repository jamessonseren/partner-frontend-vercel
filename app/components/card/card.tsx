import { IconType } from 'react-icons/lib'
import styles from './card.module.css'

import { MdSupervisedUserCircle } from 'react-icons/md'

type CardProps = {
    title: string
    mainText: string
    secondText: string
}
const Card = (props: CardProps) => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>{props.title}</span>
                <span className={styles.number}>{props.mainText}</span>
                <span className={styles.detail}>{props.secondText}</span>
            </div>
        </div>
    )
}

export default Card