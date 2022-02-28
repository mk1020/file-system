import React, {DragEvent, useEffect, useMemo, useState} from "react";
import styles from './style.module.scss'
import {ProgressState, useMove} from "../utils";

type Props = {
    length: number
    dispatch: React.Dispatch<any>;
}


export const Snake = (props: Props) => {
    const {length, dispatch} = props;
    const {pos, progress} = useMove();

    useEffect(()=>{
        if (progress.state === ProgressState.Finished) {
            dispatch({type: ProgressState.Finished})
        }
    }, [progress])

    useEffect(()=>{
        dispatch({})
    }, [pos]);

    return (
        <div
            id={'snake'}
            className={styles.container}
            style={{width: length, top: pos?.y, left: pos?.x}}
        >

        </div>
    )
}
