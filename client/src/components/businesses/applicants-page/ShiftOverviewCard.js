import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Component used to represent an individual shift, and display the associated amount
// Of applicants that have applied to the shift.
export default function ShiftOverviewCard({ shift }) {

    //Allows for candidate reviews if applications exist or displays a message if none exist
    const reviewOptions = (applications) => {
        return applications > 0
            ? <>
                <p className='shift-overview-card__block-header'>Review</p>
                <span className='shift-overview-card__review-wrapper'>
                    <Link to={`/business/applicants/review/${shift.id}`}>
                        <button className='shift-overview-card__review-button'>
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 4.75C12.5 6.96 10.71 8.75 8.5 8.75C6.29 8.75 4.5 6.96 4.5 4.75C4.5 2.54 6.29 0.75 8.5 0.75C10.71 0.75 12.5 2.54 12.5 4.75ZM10.5 4.75C10.5 3.65 9.6 2.75 8.5 2.75C7.4 2.75 6.5 3.65 6.5 4.75C6.5 5.85 7.4 6.75 8.5 6.75C9.6 6.75 10.5 5.85 10.5 4.75ZM2.5 14.75C2.7 14.12 5.07 13.07 7.46 12.81L9.5 10.81C9.11 10.77 8.82 10.75 8.5 10.75C5.83 10.75 0.5 12.09 0.5 14.75V16.75H9.5L7.5 14.75H2.5ZM12.97 14.42L18.1 9.25L19.5 10.66L12.97 17.25L9.5 13.75L10.9 12.34L12.97 14.42Z" fill="#FAFAFA" />
                            </svg>
                        </button>
                    </Link>
                </span>
            </>
            : <>
                <p className='shift-overview-card__block-header'>Review</p>
                <span className='shift-overview-card__review-wrapper'>
                    <p className='shift-overview-card__review-no-applicants'>
                        No Applicants Yet.
                    </p>
                </span>
            </>
    }


    return (
        <li className='shift-overview-card'>

            <span className='shift-overview-card__content-block'>
                <p className='shift-overview-card__block-header'>Role</p>
                <p className='shift-overview-card__block-content'>{shift.role}</p>
            </span>

            <span className='shift-overview-card__content-block'>
                <p className='shift-overview-card__block-header'>Date</p>
                <p className='shift-overview-card__block-content'>
                    {moment(shift.start_time).format('ddd MMM Do')}</p>
                <p className='shift-overview-card__block-content'>
                    {moment(shift.start_time).format('h:mm a')} -<br />{moment(shift.end_time).format('h:mm a')}
                </p>
            </span>

            <span className='shift-overview-card__content-block'>
                <p className='shift-overview-card__block-header'>Applicants</p>
                <p className='shift-overview-card__block-content'>{shift.pendingApplications.length}</p>
            </span>

            <span className='shift-overview-card__content-block'>
                {reviewOptions(shift.pendingApplications.length)}
            </span>
        </li>
    )

}