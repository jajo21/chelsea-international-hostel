import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    HashRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './routes/Home';
import Start from './routes/Start';
import Climate from './routes/Climate';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/home" element={<Home />} />
                <Route path="/climate" element={<Climate />} />
            </Routes>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
)