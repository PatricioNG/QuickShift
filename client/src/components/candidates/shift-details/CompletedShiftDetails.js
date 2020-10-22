import React from 'react'
import moment from 'moment';
import { formatMapsAddressString, formatEarnings } from '../../utils/FormatUtils';
import DisplayMap from '../../shared/DisplayMap';
import ImageAvatar from '../../shared/avatars/ImageAvatar';
import DefaultLoading from '../../shared/DefaultLoading';
import { useQuery } from '@apollo/client'
import { shiftQuery } from '../../utils/Queries';

//Completed shift details card used to show earnings and allow user to rate the shift
//Rating not yet functional
export default function CompletedShiftDetails({ routerProps }) {
    const { id } = routerProps.match.params;

    const { loading, data } = useQuery(shiftQuery(id));

    const handleBackClick = ({ history }) => {
        history.goBack()
    }

    return loading ? <DefaultLoading /> : (
        <main className='completed-shift-details'>

            <header className='completed-shift-details__header'>
                <button className='completed-shift-details__back-button' onClick={() => handleBackClick(routerProps)}>
                    <svg className='completed-shift-details__back-icon' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 0L0.5 5L5.5 10V0Z" fill="#003E19" />
                    </svg>
                </button>
                <h1 className='completed-shift-details__heading'>Previous Shift</h1>
            </header>

            <section className='completed-shift-details__details-wrapper'>
                <div className='completed-shift-details__section-wrapper completed-shift-details__section-wrapper--top'>
                    <ImageAvatar src={data.shift.business.logo_link} size='small' shadow={true} />
                    <div className='completed-shift-details__title-wrapper'>
                        <h2 className='completed-shift-details__section-heading'>Role</h2>
                        <p className='completed-shift-details__role'>{data.shift.role}</p>
                        <p className='completed-shift-details__business-name'>{data.shift.business.name}</p>
                        <p className='completed-shift-details__role-rate'>${data.shift.rate.toPrecision(4)} per Hour</p>
                    </div>
                </div>
                <div className='completed-shift-details__section-wrapper completed-shift-details__section-wrapper--center completed-shift-details__section-wrapper--border-top'>
                    <h2 className='completed-shift-details__section-heading'>You Earned</h2>
                    <span className='completed-shift-details__earnings-call-out'>
                        <p className='completed-shift-details__earnings'>
                            ${formatEarnings(
                            moment(data.shift.end_time).diff(moment(data.shift.start_time), "minutes"),
                            data.shift.rate)}
                        </p>
                    </span>
                </div>

                <div className='completed-shift-details__section-wrapper completed-shift-details__section-wrapper--center completed-shift-details__section-wrapper--border-top'>

                    <h2 className='completed-shift-details__subsection-heading'>Shift Details</h2>

                    <div className='completed-shift-details__section-wrapper completed-shift-details__section-wrapper--center'>
                        <h2 className='completed-shift-details__section-heading completed-shift-details__section-heading--small'>Time</h2>
                        <p className='completed-shift-details__date'>{moment(data.shift.start_time).format('ddd[,] MMM Do')}</p>
                        <span className='completed-shift-details__time-wrapper'>
                            <p className='completed-shift-details__start-end-time'>Start: {moment(data.shift.start_time).format('h:mm a')}</p>
                            <p className='completed-shift-details__start-end-time'>End: {moment(data.shift.end_time).format('h:mm a')}</p>
                        </span>
                    </div>

                    <div className='completed-shift-details__subsection-wrapper'>
                        <h2 className='completed-shift-details__section-heading completed-shift-details__section-heading--small'>Location</h2>
                        <DisplayMap address={formatMapsAddressString(
                            data.shift.business.street_address,
                            data.shift.business.postal_code,
                            data.shift.business.city,
                            data.shift.business.province)} className='completed-shift-details__location-map' />
                    </div>
                </div>

            </section>
        </main>
    )
}