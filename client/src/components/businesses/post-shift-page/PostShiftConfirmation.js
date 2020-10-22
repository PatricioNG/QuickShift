import React from 'react';
import { formatEarnings } from '../../utils/FormatUtils';
import moment from 'moment';
import ImageAvatar from '../../shared/avatars/ImageAvatar';
import { useMutation } from '@apollo/client'
import { createShift } from '../../utils/BusinessQueries';

//Renders the confirmation details for a new shift, allowing businesses to cancel their post
export default function PostShiftConfirmation({ shiftDetails, business, routerProps }) {

    const [createNewShift] = useMutation(createShift);

    //Used to report back the total cost of the shift + posting fee to the business
    let shiftTotal = parseFloat(formatEarnings(
        moment(shiftDetails.end).diff(moment(shiftDetails.start), 'minutes'),
        shiftDetails.rate)) + 2.99;

    //Handles creating a new shift and refreshing the data before directing
    //to the landing page in order to update the main chart
    const handleConfirmation = async () => {
        await createNewShift({
            variables: {
                id: business.id,
                start: moment(shiftDetails.start).toISOString(true),
                end: moment(shiftDetails.end).toISOString(),
                role: shiftDetails.title,
                rate: shiftDetails.rate
            }
        })
        routerProps.history.push('/business')
    }

    return (
        <article className='new-shift-confirmation'>
            <h2 className='new-shift-confirmation__heading'>Confirm Your Details</h2>

            <section className='new-shift-confirmation__wrapper'>
                <span className='new-shift-confirmation__image-wrapper'>
                    <ImageAvatar src={business.logo_link} size='small' shadow={false} />
                </span>
                <span className='new-shift-confirmation__content-wrapper'>
                    <h2 className='new-shift-confirmation__business-name'>New Shift at<br />{business.name}</h2>
                    <p className='new-shift-confirmation__content-text'>{business.street_address}, {business.city}.</p>
                </span>
            </section>

            <section className='new-shift-confirmation__wrapper'>
                <h2 className='new-shift-confirmation__heading'>Shift Details</h2>
                <span className='new-shift-confirmation__content-wrapper new-shift-confirmation__content-wrapper--full'>
                    <span className='new-shift-confirmation__callout-block'>
                        <p className='new-shift-confirmation__content-text new-shift-confirmation__content-text--callout'>Role: {shiftDetails.title}</p>
                        <p className='new-shift-confirmation__content-text new-shift-confirmation__content-text--callout'>Rate: ${shiftDetails.rate} /hr.</p>
                    </span>
                    <p className='new-shift-confirmation__content-text'>Description:</p>
                    <p className='new-shift-confirmation__content-text'>{shiftDetails.description}</p>
                </span>
            </section>

            <section className='new-shift-confirmation__wrapper new-shift-confirmation__content-wrapper--full'>
                <h2 className='new-shift-confirmation__heading'>Shift Hours</h2>
                <span className='new-shift-confirmation__callout-block'>
                    <p className='new-shift-confirmation__content-text new-shift-confirmation__content-text--callout'>Start Time: {moment(shiftDetails.start).format('h:mm a')}</p>
                    <p className='new-shift-confirmation__content-text new-shift-confirmation__content-text--callout'>End Time: {moment(shiftDetails.end).format('h:mm a')}</p>
                </span>
            </section>

            <section className='new-shift-confirmation__wrapper new-shift-confirmation__wrapper--totals'>
                <h2 className='new-shift-confirmation__heading'>Summary</h2>
                <p className='new-shift-confirmation__content-text'>Total Hours: {moment(shiftDetails.end).diff(moment(shiftDetails.start), 'hours', true)}</p>
                <p className='new-shift-confirmation__content-text'>Posting fee: $2.99</p>
                <p className='new-shift-confirmation__content-text'>Total: ${shiftTotal > 100 ? shiftTotal.toPrecision(5) : shiftTotal.toPrecision(4)}</p>
                <p className='new-shift-confirmation__call-out'>Are you sure you would like to post this shift?</p>
            </section>

            <button onClick={() => handleConfirmation()} className='new-shift-confirmation__confirm-button'>Confirm Shift</button>
        </article>
    )
}


