import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-6-gua0d6.us.auth0.com"
        clientId="XuwLxbSVZrBZueTeIuKMCvBfKCk8sDgK"
        redirectUri={window.location.origin} //redirect after authentication
    >

        <App />
    </Auth0Provider>
);
