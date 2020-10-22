import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="" //AUTH0 Connection information
    clientId="" //AUTH0 connection information
    redirectUri='http://localhost:3000/login/callback' ///The route after logging in
    audience="http://localhost:4000/graphql"
    scope="read:gql"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
