import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ImageAvatar from '../../shared/avatars/ImageAvatar';

//Renders shift cards that allow for additional details or application on the
//Find shifts page
export default function ShiftCard({ data, detailsLink }) {

    return (
        <li key={data.id} className='shift-card'>
            <section className="shift-card__business-header">
                <ImageAvatar src={data.business.logo_link} size='small' shadow={true} />
                <span className="shift-card__business-wrapper">
                    <h2 className="shift-card__shift-role">{data.role}</h2>
                    <p className="shift-card__business-name">{data.business.name}</p>
                </span>
            </section>

            <section className="shift-card__date-info">
                <p className="shift-card__shift-time">{moment(data.start_time).format('h:mm a')}-{moment(data.end_time).format('h:mm a')}</p>
                <p className="shift-card__shift-date">{moment(data.start_time).format('ddd[,] MMM Do')}</p>
            </section>

            <section className="shift-card__location-info">
                <p className="shift-card__street">{data.business.street_address}</p>
                <p className="shift-card__postal">{data.business.city}, {data.business.postal_code}</p>
            </section>

            <section className="shift-card__actions">
                {data.pending &&
                    <Link className='shift-card__apply-link' to={`/candidate/shift/${data.id}/apply`}>
                        <button className="shift-card__apply">Apply Now</button>
                    </Link>}
                <Link className='shift-card__info-link' to={detailsLink}>
                    <button className="shift-card__info">More Details</button>
                </Link>
            </section>
        </li>
    )

}