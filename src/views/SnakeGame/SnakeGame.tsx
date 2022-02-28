import React, {useEffect, useReducer, useState} from "react";
import styles from './snakeRoot.module.scss'
import {Drop, makeDrops, ProgressState, reducer, SnakeGlobalState} from "./utils";
import {Snake} from "./Snake/Snake";

type Props = {}
//не надл печалится
export const SnakeGame = (props: Props) => {
    const {} = props;
    const [globalState, dispatch] = useReducer(reducer, {
        status: ProgressState.Preparing,
        drops: undefined,
        lengthSnake: 50,
        countDrops: 0
    });
    //const [dragData, setDragData] = useState<Item | undefined>(undefined);

    useEffect(() => {
        //console.log('pos', pos)
    }, [])

    const onClickBegin = () => {
        dispatch({type: ProgressState.Started, payload: makeDrops()})
    }

    return (
        <div className={styles.boardContainerWrapper}>
            <div className={styles.count}></div>
            <div id={'board-container'} className={styles.boardContainer}>
            {
                globalState.drops?.map((drop: Drop, i: number) => (
                    <div key={'drop' + i} className={styles.drop} style={{left: drop.posX || 0, top: drop.posY || 0}}></div>
                ))
            }
            {globalState.status !== ProgressState.Started ? <button onClick={onClickBegin} className={styles.btnBegin}>Begin Game!</button> : null}

            {globalState.status === ProgressState.Started && <Snake length={globalState.lengthSnake} dispatch={dispatch}/>}

             </div>
        </div>
    )
}
