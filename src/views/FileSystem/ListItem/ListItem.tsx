import React, {DragEvent, useState} from "react";
import folder from '../../../assets/img/folder.png'
import styles from './style.module.css'

type Props = {
    title: string
    date: string
    onDragStart: (e: DragEvent<HTMLDivElement>) => void
    onDrop: (e: DragEvent<HTMLDivElement>) => void
}

export const ListItem = (props: Props) => {
    const {title, date, onDragStart, onDrop} = props;


    return (
        <div
            className={styles.rootContainer}
            draggable
            onDragStart={onDragStart}
            onDrop={onDrop}
        >
            <div className={styles.leftContainer}>
                <img
                    src={folder}
                    alt={'folder-img'}
                    width={24}
                    height={24}
                    className={styles.icon}
                />
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.date}>{date}</div>
        </div>
    )
}