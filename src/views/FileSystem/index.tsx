import React from "react";
import styles from './style.module.css'
import {ListItem} from "./ListItem/ListItem";

type Props = {
}

export const FileSystem = (props: Props)=>{
    const {} = props;

    return (
        <div className={styles.rootContainer}>
           <ListItem title={'Images'} date={'Last Monday'}/>
        </div>
    )
}