import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import { useIsAuthenticated } from '@azure/msal-react';

import AuthUser from './components/AuthUser';
import Navbar from './components/Navbar';
import Home from './components/routes/Home';
import Start from './components/routes/Start';
import Climate from './components/routes/Climate';

function App() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            {!isAuthenticated && <Start />}
            {isAuthenticated &&
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/climate" element={<Climate />} />
                    </Routes>
                </>
            }
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <AuthUser>
                <App />
            </AuthUser>
        </HashRouter>
    </React.StrictMode>
)