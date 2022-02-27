import React, {DragEvent, useMemo, useState} from "react";
import styles from './style.module.scss'

type Props = {
    length: number
    posY: number
    posX: number
}


export const Snake = (props: Props) => {
    const {length, posY, posX} = props;
    // const [items, setItems] = useState<Item[]>(mock);
    //const [dragData, setDragData] = useState<Item | undefined>(undefined);

    return (
        <div
            id={'snake'}
            className={styles.container}
            style={{width: length, top: posY, left: posX}}
        >

        </div>
    )
}
