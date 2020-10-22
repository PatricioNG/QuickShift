import React from 'react'

//Component to render the google map based on the address passed in as props
export default function DisplayMap({ address, className }) {

    let api = '' //Google maps API key here

    return (
        <iframe title='shiftMap' className={className} frameBorder='0'
            src={`https://www.google.com/maps/embed/v1/place?key=${api}&q=${address}`} allowFullScreen></iframe>
    )
}