import React from "react";
import ReactDOM from "react-dom/client";
// import {Goerli} from '@thirdweb-dev/chains'
import { BrowserRouter } from 'react-router-dom'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { StateContextProvider } from './context'
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli} activeChain={ChainId.Goerli}>
        <BrowserRouter>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </BrowserRouter>
    </ThirdwebProvider>
);