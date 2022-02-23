import React from "react";
import folder from '../../../assets/img/folder.png'
import styles from './style.module.css'

type Props = {
    title: string
    date: string
}

export const ListItem = (props: Props)=>{
    const {title, date} = props;

    return (
        <div className={styles.rootContainer}>
            <img
                src={folder}
                alt={'folder-img'}
                width={24}
                height={24}
                className={styles.icon}
            />
            <div className={styles.title}>{title}</div>
            <div className={styles.date}>{date}</div>
        </div>
    )
}