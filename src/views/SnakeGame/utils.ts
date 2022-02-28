import {useEffect, useState} from "react";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getOneDrop = () => {
    const board = document.getElementById('board-container')?.getBoundingClientRect();
    if (board) {
        const drop = {
            posX: getRandomInt(board?.left + 30, board.right - 30),
            posY: getRandomInt(board?.top + 30, board.bottom - 30)
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

export enum ProgressState {
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
    direction?: Direction,
    intervalId?: any
}
const posInitValue = (board?: DOMRect)=> ({x: (board?.width || 0) / 2, y: (board?.height || 0) / 2});
export const useMove = () => {

    const [pos, setPos] = useState<{ x: number, y: number }>();
    const [progress, setProgress] = useState<Progress>({state: ProgressState.Preparing, direction: Direction.None});
    console.log('force useMuve', pos, progress)

    useEffect(() => {
        const board = document.getElementById('board-container')?.getBoundingClientRect();
        setPos(posInitValue(board));
        setProgress({state: ProgressState.Started, direction: Direction.None});
    }, []);

    useEffect(() => {
        let intervalID: any = -1;
        let direction: Direction = Direction.None;
        if (progress.state === ProgressState.Started && pos) {
            const board = document.getElementById('board-container')?.getBoundingClientRect();
            const snake = document.getElementById("snake")?.getBoundingClientRect();

            document.addEventListener('keydown', (e) => {
                const key = e.key;
                if (isArrowPressed(key) && key !== direction) {
                    setProgress({...progress, direction: key as Direction});
                    clearInterval(intervalID);
                    direction = key as Direction;
                   //console.log('progress.intervalId', progress.intervalId)
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
                       // console.log('pasTemp', posTemp)
                       //console.log('board top', board)
                       //console.log('if', Math.round(posTemp.y - (snake?.height || 0)), Math.round(board?.bottom || -1))

                        if (
                            Math.round(posTemp.x) === Math.round(board?.left || -1) - (snake?.width || 0 / 2) ||
                            Math.round(posTemp.x) === Math.round(board?.right || -1) - (snake?.width || 0) ||
                            Math.round(posTemp.y) === Math.round(board?.top || -1) - (snake?.height || 0 / 2) ||
                            Math.round(posTemp.y) === Math.round(board?.bottom || -1) - (snake?.height || 0)
                        ) {
                          //console.log('pasTemp', posTemp)
                          console.log('board', board)
                            console.log('clear',Math.round(posTemp.x))
                            clearInterval(id);
                            setProgress({intervalId: -1, state: ProgressState.Finished});
                        }
                    }, 15)
                   // console.log('progress.intervalId ID', id)
                    intervalID = id;
                    setProgress({...progress, intervalId: intervalID})
                }
            });
        }

        return ()=>{clearInterval(intervalID)};
    }, [progress.state])

    return {pos, progress}
}

const isInRange = (start: number, end: number, point: number)=> {
    return point >= start && point <= end;
}

type Action = {
    type: string | ProgressState;
    payload?: any;
}
export type Drop = {
    posX: number
    posY: number
}

export type SnakeGlobalState = {
    status: ProgressState
    drops?: Drop[]
    lengthSnake: number
    countDrops: number
}
export const reducer = (state: SnakeGlobalState, action: Action)=> {
    switch (action.type) {
        case ProgressState.Started:
            console.log('322222')
            return {...state, status: action.type, drops: action.payload};
        case ProgressState.Finished:
            return {...state, status: action.type};
        case ProgressState.Preparing:
            return {...state, status: action.type};
        case 'manageGame': {
            const {pos, drop} = action.payload;
            const snakeHeight = 30;
            if (isInRange(pos.x, pos.x + snakeHeight, drop.x) ||
                isInRange(pos.y, pos.y + snakeHeight, drop.y)
            ) {
                return {...state, countDrops: state.countDrops++, lengthSnake: state.lengthSnake + 30}
            } else {
                return state;
            }
        }
        default:
            throw new Error();
    }
}