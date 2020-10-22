import React from 'react';
import DisplayMap from '../../shared/DisplayMap';
import { formatMapsAddressString } from '../../utils/FormatUtils';
import moment from 'moment';
import { useMutation } from '@apollo/client'
import { createApplicationMutation } from '../../utils/Queries'

//Renders the shift form used for applying to a new shift
export default function ApplyForShiftForm({ shiftDetails, user, routerProps }) {

    // Mutation to submit a new application
    const [createApp] = useMutation(createApplicationMutation(user.id, shiftDetails.id))

    //Pushes the application through to database and
    //Redirects to a confirmation screen
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createApp({
            variables: {
                userID: user.id,
                shiftID: shiftDetails.id,
                message: event.target.applicationMessage.value
            }
        });
        routerProps.history.push(`/candidate/shift/${shiftDetails.id}/apply/confirmation`)
    }

    return (
        <form className='shift-application-form' onSubmit={(event) => handleSubmit(event)}>

            <h1 className='shift-application-form__header'>Applying To {shiftDetails.business.name}</h1>

            <section className='shift-application-form__wrapper'>
                <h2 className='shift-application-form__section-header'>Shift Details</h2>
                <span className='shift-application-form__half-section'>
                    <p className='shift-application-form__subheader'>Role:</p>
                    <p className='shift-application-form__content-text'>{shiftDetails.role}</p>
                </span>
                <span className='shift-application-form__half-section'>
                    <p className='shift-application-form__subheader'>Rate:</p>
                    <p className='shift-application-form__content-text'>{shiftDetails.rate}</p>
                </span>
                <span className='shift-application-form__half-section'>
                    <p className='shift-application-form__subheader'>Start:</p>
                    <p className='shift-application-form__content-text'>{moment(shiftDetails.start_time).format('ddd MMM Do')}<br />{moment(shiftDetails.start_time).format('h:mm a')}</p>
                </span>
                <span className='shift-application-form__half-section'>
                    <p className='shift-application-form__subheader'>End:</p>
                    <p className='shift-application-form__content-text'>{moment(shiftDetails.end_time).format('ddd MMM Do')}<br />{moment(shiftDetails.end_time).format('h:mm a')}</p>
                </span>
                <span className='shift-application-form__full-section'>
                    <p className='shift-application-form__subheader'>Location:</p>
                    <DisplayMap address={formatMapsAddressString(
                        shiftDetails.business.street_address,
                        shiftDetails.business.postal_code,
                        shiftDetails.business.city,
                        shiftDetails.business.province)} className='shift-application-form__location-map' />
                </span>
            </section>

            <section className='shift-application-form__wrapper'>
                <h2 className='shift-application-form__section-header'>Application Note</h2>
                <textarea required name='applicationMessage' className='shift-application-form__input'
                    defaultValue={"Hello, I'm interested in this shift. Please consider my application."} readOnly={false}>
                </textarea>
            </section>

            <section className='shift-application-form__wrapper'>
                <button className='shift-application-form__confirm-button'>Send Application</button>
            </section>

        </form>
    )

}