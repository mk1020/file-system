import {useEffect, useState} from "react";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getOneDrop = () => {
    const board = document.getElementById('board-container')?.getBoundingClientRect();
    console.log(board)
    if (board) {
        const drop = {
            posX: getRandomInt(board?.left + 30, board.width - 30),
            posY: getRandomInt(board?.top + 30, board.height - 30)
        }
        return drop;
    } else {
        throw 'board doesnt exist';
    }

}

export const getCountOfDrops = () => {
    return getRandomInt(1, 5)
}

export const makeDrops = () => {
    const count = getCountOfDrops();
    const drops = [];
    for (let i = 0; i < count; i++) {
        drops.push(getOneDrop())
    }
    return drops;
}

const isArrowPressed = (key: string) => {
    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
        return true;
    } else {
        return false;
    }
}

const handleLeft = (pos: { x: number, y: number }) => {
    return {...pos, x: pos.x--}
}
const handleRight = (pos: { x: number, y: number }) => {
    return {...pos, x: pos.x++}
}
const handleUp = (pos: { x: number, y: number }) => {
    return {...pos, y: pos.y--}
}
const handleDown = (pos: { x: number, y: number }) => {
    return {...pos, y: pos.y++}
}

enum ProgressState {
    Finished = 'Finished',
    Started = 'Started',
    Preparing = 'Preparing'
}
enum Direction {
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    None = 'None'
}
type Progress = {
    state: ProgressState,
    direction: Direction,
    intervalId?: any
}
export const useMove = () => {

    const [pos, setPos] = useState<{ x: number, y: number }>();
    const [progress, setProgress] = useState<Progress>({state: ProgressState.Preparing, direction: Direction.None});

    useEffect(() => {
        const board = document.getElementById('board-container')?.getBoundingClientRect();
        setPos({x: (board?.width || 0) / 2, y: (board?.height || 0) / 2});
        setProgress({state: ProgressState.Started, direction: Direction.None});
    }, []);

    useEffect(() => {
        if (progress.state === ProgressState.Started && pos) {
            let intervalID: any = -1;
            const snake = document.getElementById("snake");
            const board = document.getElementById('board-container')?.getBoundingClientRect();

            document.addEventListener('keydown', (e) => {
                const key = e.key;
                if (isArrowPressed(key)) {
                    setProgress({...progress, direction: key as Direction});
                    clearInterval(intervalID);
                   console.log('progress.intervalId', progress.intervalId)
                    const id = setInterval(() => {
                        let posTemp = pos;
                        switch (key) {
                            case "ArrowLeft":
                                posTemp = handleLeft(pos)
                                setPos(posTemp)
                                break;
                            case "ArrowRight":
                                posTemp = handleRight(pos)
                                setPos(posTemp)
                                break;
                            case "ArrowUp":
                                posTemp = handleUp(pos)
                                setPos(posTemp)
                                break;
                            case "ArrowDown":
                                posTemp = handleDown(pos)
                                setPos(posTemp)
                                break;
                        }
                        //console.log('pasTemp Y', posTemp.y)
                       // console.log('board top', board?.bottom)

                        if (
                            Math.round(posTemp.x) === Math.round(board?.left || -1) ||
                            Math.round(posTemp.x) === Math.round(board?.right || -1) ||
                            Math.round(posTemp.y) === Math.round(board?.top || -1) ||
                            Math.round(posTemp.y) === Math.round(board?.bottom || -1)
                        ) {
                            console.log('pasTemp', posTemp)
                            console.log('board', board)
                            clearInterval(id);
                            setProgress({...progress, state: ProgressState.Finished})
                        }
                    }, 30)
                    console.log('progress.intervalId ID', id)
                    intervalID = id;
                    setProgress({...progress, intervalId: id})
                }


            });
        }

        return ()=>{clearInterval(progress.intervalId)};
    }, [progress.state])

    return {pos, progress}
}