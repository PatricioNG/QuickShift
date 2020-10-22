import React, { useState } from 'react';
import LoginScreen from './components/login/LoginScreen';
import Candidates from './Candidates';
import Businesses from './Businesses';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAuth0 } from '@auth0/auth0-react';
import './styles/main.css';
import axios from 'axios';
import LoginRouter from './components/login/LoginRouter';

//Main component that handles Login Screen, businesses, and candidates rendering
export default function App() {

  console.log('render');

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    userType: null,
    id: null
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const validLogIn = async () => {
    const token = localStorage.getItem('token');
    return await axios.get('http://localhost:4000/user', { headers: { authorization: token ? `Bearer ${token}` : "" } })
      .then(({ data }) => {
        console.log('validloginmethod', data);
        setUserStatus({ loggedIn: true, userType: data.type, id: data.user.id })
      })
      .catch((err) => console.log(err))
  }
  console.log(userStatus);

  return (
    <ApolloProvider client={client} >
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" render={() => <LoginScreen />} exact />
            <Route path="/login/callback" render={(routerProps) => <LoginRouter validLogIn={validLogIn} currentUser={userStatus} routerProps={routerProps} />} exact />
            {userStatus.loggedIn && userStatus.userType === 'user' && <Route path="/candidate" render={(routerProps) => {
              return isAuthenticated
                ? <Candidates userID={userStatus.id} routerProps={routerProps} />
                : <h1>You need to be signed in</h1>
            }} />}
            {userStatus.loggedIn && userStatus.userType === 'business' && <Route path="/business" render={() => {
              return isAuthenticated
                ? <Businesses userID={userStatus.id} />
                : <h1>You need to be signed in</h1>
            }} />}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}