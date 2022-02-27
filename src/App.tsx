import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FileSystem} from "./views/FileSystem";
import {SnakeGame} from "./views/SnakeGame/SnakeGame";

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<FileSystem/>}/>
                    <Route path={'/snake'} element={<SnakeGame/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
