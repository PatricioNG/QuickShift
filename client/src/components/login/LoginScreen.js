import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';


//App login screen, login functionality build out through Auth0
export default function LoginScreen() {
    const { loginWithRedirect } = useAuth0();

    return (
        <main className="login-screen">
            <h1 className="login-screen__heading">Quickshift</h1>
            <div className='login-screen__action-wrapper'>
                <button className="login-screen__login-google" onClick={() => loginWithRedirect()}>Log In Or Sign Up</button>
                <p className='login-screen__register-cta'>Looking to set up your business? Contact us: BusinessSupport@Quickshift.com</p>
            </div>
        </main>
    )
}