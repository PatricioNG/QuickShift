import React from 'react';
import DisplayMap from '../../shared/DisplayMap';
import { formatMapsAddressString } from '../../utils/FormatUtils';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ImageAvatar from '../../shared/avatars/ImageAvatar';
import DefaultLoading from '../../shared/DefaultLoading';
import { useQuery } from '@apollo/client'
import { shiftQuery } from '../../utils/Queries'

//Shift details card used for when a user wants additional details regarding
//a shift
export default function ShiftDetails({ routerProps }) {
    const { id } = routerProps.match.params;

    const { loading, data } = useQuery(shiftQuery(id));

    const handleBackClick = ({ history }) => {
        history.goBack()
    }

    return loading
        ? <DefaultLoading />
        : (
            <main className='shift-details'>
                <header className='shift-details__header'>
                    <button className='shift-details__back-button' onClick={() => handleBackClick(routerProps)}>
                        <svg className='shift-details__back-icon' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 0L0.5 5L5.5 10V0Z" fill="#003E19" />
                        </svg>
                    </button>
                    <h1 className='shift-details__heading'>Shift Info</h1>
                </header>

                <section className='shift-details__details-wrapper'>

                    <div className='shift-details__section-wrapper shift-details__section-wrapper--top'>
                        <ImageAvatar src={data.shift.business.logo_link} size='medium' shadow={true} />
                        <div className='shift-details__title-wrapper'>
                            <h2 className='shift-details__section-heading'>Role</h2>
                            <p className='shift-details__role'>{data.shift.role}</p>
                            <p className='shift-details__business-name'>{data.shift.business.name}</p>
                            <p className='shift-details__role-rate'>${data.shift.rate.toPrecision(4)} per Hour</p>
                        </div>
                    </div>

                    <div className='shift-details__section-wrapper'>
                        <h2 className='shift-details__section-heading'>Time</h2>
                        <p className='shift-details__date'>{moment(data.shift.start_time).format('ddd[,] MMM Do')}</p>
                        <span className='shift-details__time-wrapper'>
                            <p className='shift-details__start-end-time'>Start: {moment(data.shift.start_time).format('h:mm a')}</p>
                            <p className='shift-details__start-end-time'>End: {moment(data.shift.end_time).format('h:mm a')}</p>
                        </span>
                    </div>

                    <div className='shift-details__section-wrapper'>
                        <h2 className='shift-details__section-heading'>Location</h2>

                        <DisplayMap address={formatMapsAddressString(
                            data.shift.business.street_address,
                            data.shift.business.postal_code,
                            data.shift.business.city,
                            data.shift.business.province)} className='shift-details__location-map' />
                    </div>
                </section>

                <section className='shift-details__section-wrapper shift-details__section-wrapper--action-button'>
                    {data.shift.pending &&
                        <Link className='shift-details__apply-link' to={`/candidate/shift/${data.shift.id}/apply`}>
                            <button className='shift-details__apply'>Apply Now</button>
                        </Link>}
                </section>
            </main>
        )
}