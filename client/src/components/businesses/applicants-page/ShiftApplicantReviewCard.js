import React from 'react';
import moment from 'moment';
import Slider from 'react-slick';
import IndividualApplicationCard from './IndividualApplicationCard';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import DefaultLoading from '../../shared/DefaultLoading';
import { useQuery } from '@apollo/client'
import { businessShiftDetails } from '../../utils/BusinessQueries';

// Sub-landing page used to contain slider of applicant review cards. This page
// is where businesses will actually sort through applicants and make a decision on if
// the applicant is hired.
export default function ShiftApplicantReviewCard({ routerProps }) {

    //Refetch passed down to individual card to refresh list if applicant is chosen
    const { loading, data, refetch } = useQuery(businessShiftDetails(routerProps.match.params.shiftID));

    //Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return loading
        ? <DefaultLoading />
        : data.shift.pendingApplications.length === 0
            ? <h1 className='applicants-review-card__no-applicants'>No applicants to review yet, we will keep you updated once you have more.</h1>
            : (
                <section className='applicants-review-card'>
                    <h2 className='applicants-review-card__heading'>{data.shift.pendingApplications.length} {data.shift.pendingApplications.length === 1 ? 'applicant' : 'applicants'} for your shift on {moment(data.shift.start_time).format('ddd MMM Do')}</h2>
                    <div className='applicants-review-card__carousel-wrapper'>
                        <Slider {...settings}>
                            {data.shift.pendingApplications.map((app) => <IndividualApplicationCard key={app.id} application={app} refetch={refetch} />)}
                        </Slider>
                    </div>
                </section>
            )

}