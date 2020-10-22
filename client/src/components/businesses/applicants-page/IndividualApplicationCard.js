import React from 'react';
import moment from 'moment';
import ImageAvatar from '../../shared/avatars/ImageAvatar';
import { useMutation } from '@apollo/client';
import { reviewApplicationMutation } from '../../utils/BusinessQueries';


// Card component that contains the information of an individual's application
// Used to send a confirmation back to the db on the businesses choice of whether
// The applicant is accepted or not.
export default function IndividualApplicationCard({ application, refetch }) {

    const [reviewApplication] = useMutation(reviewApplicationMutation);

    // Handles updating the DB with the business decision on whether
    // The applicant was hired, calls refetch to update the slider list of
    // Cards after an applicant was reviewed.
    const handleClick = (choice) => {
        reviewApplication({
            variables: {
                shiftID: application.shift_id,
                applicationID: application.id,
                accepted: choice
            }
        })
        refetch()
    }

    return (
        <section className='individual-applicant-card'>
            <h2 className='individual-applicant-card__heading'>{application.user.first_name} {application.user.last_name}</h2>

            <span className='individual-applicant-card__profile-wrapper'>
                <ImageAvatar src={application.user.profile_image_link} size='medium' shadow={true} />
            </span>

            <span className='individual-applicant-card__details-wrapper'>
                <p className='individual-applicant-card__content-text'>Applied On: {moment(application.applied_on).format('ddd MMM Do')}</p>
                <p className='individual-applicant-card__content-text'>Application Note:</p>
                <p className='individual-applicant-card__content-text individual-applicant-card__content-text--callout'>{application.application_message}</p>
            </span>

            <span className='individual-applicant-card__action-wrapper'>
                <button onClick={() => { handleClick(false) }} className='individual-applicant-card__action-button'>
                    Skip
                </button>
                <button onClick={() => { handleClick(true) }} className='individual-applicant-card__action-button'>
                    Add To Shortlist
                </button>
            </span>
        </section>
    )
}