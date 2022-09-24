import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import { useIsAuthenticated } from '@azure/msal-react';

import AuthUser from './components/auth/AuthUser';
import Navbar from './components/navbar/Navbar';
import Home from './components/routes/Home';
import Start from './components/routes/Start';
import Climate from './components/routes/Climate';
import { DataProvider } from './contexts/DataContext';

function App() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <DataProvider>
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
        </DataProvider>
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