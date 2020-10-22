import React, { useEffect } from 'react';
import DefaultLoading from '../shared/DefaultLoading';
import { useAuth0 } from '@auth0/auth0-react';

// Router component, used for redirecting the client during the login process
export default function LoginRouter({ validLogIn, currentUser, routerProps }) {

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `http://localhost:4000/graphql`,
                    scope: "read:gql"
                });
                localStorage.setItem('token', accessToken);
            } catch (e) {
                console.log(e)
            }
        }

        getToken().then(() => {
            validLogIn();
        }).then(() => {
            if (currentUser.id !== null && currentUser.userType !== null) {
                currentUser.userType === 'user'
                    ? routerProps.history.push('/candidate')
                    : routerProps.history.push('/business')
            }
        })
    });

    return (
        <DefaultLoading />
    )
}