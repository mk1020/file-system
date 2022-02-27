import React, {DragEvent, useMemo, useState} from "react";
import styles from './style.module.css'
import {ListItem} from "./ListItem/ListItem";

type Props = {}

interface Item {
    id: string
    title: string
    date: string
}

export const FileSystem = (props: Props) => {
    const {} = props;
    const [items, setItems] = useState<Item[]>(mock);
    const [dragData, setDragData] = useState<Item | undefined>(undefined);




    return (
        <div
            className={styles.rootContainer}
            onDragOver={handleDragOver}
        >

        </div>
    )
}
