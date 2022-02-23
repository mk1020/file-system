import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FileSystem} from "./views/FileSystem";

function App() {


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<FileSystem/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
