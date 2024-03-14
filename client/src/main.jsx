import React from "react";
import ReactDOM from "react-dom/client";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter } from 'react-router-dom'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { StateContextProvider } from './context'
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={Sepolia} clientId={import.meta.env.VITE_CLIENT_ID}>
        <BrowserRouter>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </BrowserRouter>
    </ThirdwebProvider>
);