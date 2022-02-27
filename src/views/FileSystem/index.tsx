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

    const onDragStart = (draggedItem: Item) => {
        setDragData(draggedItem);
        console.log(draggedItem)
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>, indexItemDestination: number) => {
        //99-120=21
        console.log('Math.abs(e.currentTarget.getBoundingClientRect().top - e.clientY)', Math.abs(e.currentTarget.getBoundingClientRect().top - e.clientY))
        console.log(' e.currentTarget.clientHeight / 2)',  e.currentTarget.clientHeight / 2)
        if (Math.abs(e.currentTarget.getBoundingClientRect().top - e.clientY) < e.currentTarget.clientHeight / 2) {
            if (dragData) {
                const newItems: Item[] = [...items];

                //insert dragged item
                newItems.splice(indexItemDestination, 0, dragData);

                //remove old dragged
                const indexDraggedItem = newItems.findIndex((el, index) => el.id === dragData.id && index !== indexItemDestination);
                newItems.splice(indexDraggedItem, 1)
                setItems(newItems)
            }
        } else {
            if (dragData) {
                const newItems: Item[] = [...items];
                //insert dragged item
                newItems.splice(indexItemDestination + 1, 0, dragData);

                //remove old dragged item
                const indexDraggedItem = newItems.findIndex((el,i) => el.id === dragData.id && i !== indexItemDestination);
                newItems.splice(indexDraggedItem, 1)
                setItems(newItems)
            }
        }
    };

    const renderData = useMemo(() => (
        items.map((el, index) => (
            <ListItem
                title={el.title}
                date={el.date}
                key={el.id}
                onDragStart={() => onDragStart(el)}
                onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(e, index)}
            />
        ))
    ), [mock, items]);


    return (
        <div
            className={styles.rootContainer}
            onDragOver={handleDragOver}
        >
            {items.map((el, index) => (
                <ListItem
                    title={el.title}
                    date={el.date}
                    key={el.id}
                    onDragStart={() => onDragStart(el)}
                    onDrop={(e: DragEvent<HTMLDivElement>) => onDrop(e, index)}
                />
            ))}
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