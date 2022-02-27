import React, {DragEvent, useEffect, useMemo, useState} from "react";
import styles from './snakeRoot.module.scss'
import {getOneDrop, makeDrops, useMove} from "./utils";
import {Snake} from "./Snake/Snake";

type Props = {}

type Drop = {
    posX: number
    posY: number
}
export const SnakeGame = (props: Props) => {
    const {} = props;
    const [drops, setDrops] = useState<Drop[]>();
    //const [dragData, setDragData] = useState<Item | undefined>(undefined);
    const {pos, progress} = useMove();

    useEffect(() => {
        //console.log('pos', pos)
    }, [pos])

    const onClickBegin = () => {
        setDrops(makeDrops())
    }


    return (
        <div
            id={'board-container'}
            className={styles.boardContainer}
        >
            {
                drops?.map((drop, i) => (
                    <div key={'drop' + i} className={styles.drop} style={{left: drop.posX || 0, top: drop.posY || 0}}></div>
                ))
            }
            {
                !drops ? <button onClick={onClickBegin} className={styles.btnBegin}>Begin Game!</button> : null
            }

            {!!pos ? <Snake length={30} posY={pos.y} posX={pos.x}/> : null}

        </div>
    )
}
