import React, {useMemo, useState} from "react";
import styles from './style.module.css'
import {ListItem} from "./ListItem/ListItem";

type Props = {}

export const FileSystem = (props: Props) => {
    const {} = props;
    const [items, setItems] = useState(mock);
    const [dragData, setDragData] = useState({});

    const handleDragStart = (id: string) => {
        setDragData({id: id});
    };
    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (id: string) => {
    };

    const renderData = useMemo(() => (
        items.map((el, index) => (
            <ListItem
                title={el.title}
                date={el.date}
                key={'list-item-' + index}
                onDragStart={handleDragStart}
                id={el.id}
                handleDrop={handleDrop}
            />
        ))
    ), [mock]);



    return (
        <div
            className={styles.rootContainer}
             onDragOver={handleDragOver}
        >
            {renderData}
        </div>
    )
}


const mock = [
    {
        id: '1',
        title: 'Images',
        date: 'Last Monday',
    },
    {
        id: '2',
        title: 'Files',
        date: 'Last Friday',
    },
    {
        id: '3',
        title: 'Notes',
        date: '22.01.2022',
    },
    {
        id: '4',
        title: 'Passwords',
        date: '21.01.2020',
    },
    {
        id: '5',
        title: 'Songs',
        date: '01.01.2020',
    },
    {
        id: '6',
        title: 'New Movies',
        date: 'Last Sunday',
    },
    {
        id: '7',
        title: 'Favorite films',
        date: '29.01.2020',
    },
]