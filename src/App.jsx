import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    HashRouter,
    Routes,
    Route
} from "react-router-dom";
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { msalConfig } from './auth/authConfig';

import Navbar from './components/Navbar';
import Home from './routes/Home';
import Start from './routes/Start';
import Climate from './routes/Climate';

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

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HashRouter>
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </HashRouter>
    </React.StrictMode>
)