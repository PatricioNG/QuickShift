import React from 'react';
import moment from 'moment';
import ImageAvatar from '../../shared/avatars/ImageAvatar';

//Renders a filled shift card on the business landing page
//Messaging functionality not built out yet due to submission deadline
export default function BusinessShiftCard({ shift }) {

    return (
        <section className='business-shift-card'>

            <div className='business-shift-card__card-wrapper'>
                <span className='business-shift-card__image-wrapper'>
                    <ImageAvatar src={shift.user.profile_image_link} size='medium' shadow={true} />
                </span>
                <div className='business-shift-card__header-wrapper'>
                    <h2 className='business-shift-card__heading'>{shift.role}</h2>
                    <p className='business-shift-card__subheading'>{moment(shift.start_time).format('ddd[,] MMM Do')}</p>
                    <p className='business-shift-card__subheading'>{moment(shift.start_time).format('h:mm a')} - {moment(shift.end_time).format('h:mm a')}</p>
                    <p className='business-shift-card__subheading business-shift-card__subheading--callout'>Filled by:</p>
                    <p className='business-shift-card__heading business-shift-card__heading--name'>{shift.user.first_name} {shift.user.last_name}</p>
                </div>
            </div>

            <div className='business-shift-card__actions'>
                <p className='business-shift-card__message-cta'>Need to reach out to {shift.user.first_name}?</p>
                <button className='business-shift-card__message-button'>Message {shift.user.first_name}</button>
            </div>
        </section>
    )

}