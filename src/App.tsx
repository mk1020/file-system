import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {FileSystem} from "./views/FileSystem";

function App() {
  

  return (
    <div className="App">
        <BrowserRouter>
            <Route path={'/'} element={<FileSystem/>} />
        </BrowserRouter>
    </div>
  );
}
gdfdff
export default App;
