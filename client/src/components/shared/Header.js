import { useAuth0 } from '@auth0/auth0-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

//Header component for both businesses and candidates, links displayed are based on props passed in
export default function Header({ className, links, linkTo }) {
    const { logout } = useAuth0();
    const navMenuRef = useRef();

    //To navigate upon click
    const handleClick = () => {
        toggleNavClass()
        document.documentElement.scrollTop = 0;
    }

    //Adds class to animate and close the nav menu if scrolled
    const handleScroll = () => {
        navMenuRef.current.classList.add('sliding-nav--closed');
    }

    const toggleNavClass = () => {
        if (navMenuRef.current.classList.contains('sliding-nav--closed')) {
            navMenuRef.current.classList.remove('sliding-nav--closed');
        } else {
            navMenuRef.current.classList.add('sliding-nav--closed');
        }
    }

    return (
        <>
            <nav ref={navMenuRef}
                onWheel={() => handleScroll()}
                className='sliding-nav sliding-nav--closed'>
                <div className='nav-links__wrapper'>
                    {links.map((link) => <Link key={link.to} onClick={() => {
                        if (link.title !== 'Log Out') {
                            handleClick()
                        } else {
                            localStorage.removeItem('token');
                            logout({ returnTo: window.location.origin });
                        }
                    }} className='nav-links__link' to={link.to}>{link.title}</Link>)}
                </div>
            </nav>
            <header className={`main-nav ${className}`}>
                <svg onClick={() => handleClick()} className='main-nav__menu-icon' width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 2V0H18V2H0ZM0 7H18V5H0V7ZM0 12H18V10H0V12Z" fill="white" />
                </svg>
                <Link onClick={() => !navMenuRef.current.classList.contains('sliding-nav--closed') && handleClick()} to={`/${linkTo}`}>
                    <p className='main-nav__logo'>QuickShift</p>
                </Link>
            </header>
        </>
    )

}