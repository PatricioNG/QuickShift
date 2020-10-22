import React from 'react'
import moment from 'moment';
import ImageAvatar from '../../shared/avatars/ImageAvatar';

//Renders an application that's waiting for review in the pending application page
export default function PendingApplicationCard({ data }) {

    return (
        <li key={data.id} className='application-card'>
            <section className="application-card__section-wrapper application-card__section-wrapper--full">
                <ImageAvatar src={data.business.logo_link} size='small' shadow={true} />
                <span className="application-card__business-wrapper">
                    <h2 className="application-card__shift-role">{data.role}</h2>
                    <p className="application-card__business-name">{data.business.name}</p>
                </span>
            </section>

            <section className="application-card__section-wrapper application-card__section-wrapper--half">
                <p className="application-card__content-text">{moment(data.shift.start_time).format('h:mm a')}-{moment(data.shift.end_time).format('h:mm a')}</p>
                <p className="application-card__content-text">{moment(data.shift.start_time).format('ddd[,] MMM Do')}</p>
            </section>

            <section className="application-card__section-wrapper application-card__section-wrapper--half">
                <p className="application-card__content-text">{data.business.street_address}</p>
                <p className="application-card__content-text">{data.business.city}, {data.business.postal_code}</p>
            </section>

            <section className="application-card__section-wrapper application-card__section-wrapper--full">
                <p className="application-card__content-text application-card__content-text--callout">Applied On:</p>
                <p className='application-card__content-text application-card__content-text--callout'>{moment(data.applied_on).format('ddd[,] MMM Do, h:mm a')}</p>
            </section>
        </li>
    )

}