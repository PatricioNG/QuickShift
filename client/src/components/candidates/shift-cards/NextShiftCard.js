import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import ImageAvatar from '../../shared/avatars/ImageAvatar';

//Renders the next upcoming shift on the candidate homepage
export default function NextShiftCard({ nextShift }) {

    return nextShift === null
        ? (
            <section className='next-shift-card'>
                <h2 className='next-shift-card__heading'>Next Shift</h2>
                <p className='next-shift-card__no-shift'>No upcoming shifts yet, check back once you've applied to some shifts.</p>
            </section>)
        : (
            <article className='next-shift-card'>

                <h2 className='next-shift-card__heading'>Next Shift</h2>

                <section className='next-shift-card__details-wrapper next-shift-card__details-wrapper--profile-image'>
                    <ImageAvatar src={nextShift.business.logo_link} size='extra-small' shadow={true} />
                    <p className='next-shift-card__role'>{nextShift.role}</p>
                </section>

                <section className='next-shift-card__details-wrapper'>
                    <span className='next-shift-card__icon-wrapper'>
                        <svg className="next-shift-card__calendar-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="icon/notification/event_note_24px">
                                <path id="icon/notification/event_note_24px_2" fillRule="evenodd" clipRule="evenodd" d="M19 4H18V2H16V4H8V2H6V4H5C3.90002 4 3 4.9 3 6V20C3 21.1 3.90002 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM5 6V8H19V6H5ZM7 12H17V14H7V12ZM14 16H7V18H14V16Z" fill="#003E19" fillOpacity="0.9" />
                            </g>
                        </svg>
                    </span>
                    <p className='next-shift-card__date'>{moment(nextShift.start_time).format('ddd[,] MMM Do')}<br />{`${moment(nextShift.start_time).format('h:mm a')} - ${moment(nextShift.end_time).format('h:mm a')}`}</p>
                </section>

                <section className='next-shift-card__details-wrapper'>
                    <span className='next-shift-card__icon-wrapper'>
                        <svg className='next-shift-card__map-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C15.31 2 18 4.69 18 8C18 12.5 12 19 12 19C12 19 6 12.5 6 8C6 4.69 8.69 2 12 2ZM19 22V20H5V22H19ZM8 8C8 5.78998 9.78998 4 12 4C14.21 4 16 5.78998 16 8C16 10.13 13.92 13.46 12 15.91C10.08 13.47 8 10.13 8 8ZM10 8C10 6.90002 10.9 6 12 6C13.1 6 14 6.90002 14 8C14 9.09998 13.11 10 12 10C10.9 10 10 9.09998 10 8Z" fill="#003E19" fillOpacity="0.9" />
                        </svg>
                    </span>
                    <p className='next-shift-card__location'>{nextShift.business.name}<br />{nextShift.business.street_address}<br />{nextShift.business.postal_code}</p>
                </section>

                <section className='next-shift-card__action-wrapper'>
                    <Link className='next-shift-card__shift-link' to={`/candidate/shift/${nextShift.id}`}>
                        <button className='next-shift-card__shift-info'>
                            <svg className='next-shift-card__shift-info-icon' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 0L0.5 5L5.5 10V0Z" fill="white" />
                            </svg>
                            <span className='next-shift-card__shift-info-text'>Shift Details</span>
                        </button>
                    </Link>
                </section>

            </article>
        )

}