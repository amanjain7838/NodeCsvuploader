import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom";
import Upload from './Components/Upload';
import User from './Components/User';
import Home from './Components/Home';
import NavBar from './Components/header/Navbar';

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/upload" element={<Upload/>}/>
                <Route path="/users" element={<User />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
        </>
    );
}

export default App;
