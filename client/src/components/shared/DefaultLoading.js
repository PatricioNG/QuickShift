import React from 'react';

//Component to render a default styled loading screen
export default function DefaultLoading() {

    return (
        <section className='loading-screen'>
            <div className='loading-screen__wrapper'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <h1 className='loading-screen__message'>Getting things ready.</h1>
            </div>
        </section>
    )
}