import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultLoading from '../../shared/DefaultLoading';
import ShiftApplicantReviewCard from './ShiftApplicantReviewCard';
import ShiftOverviewCard from './ShiftOverviewCard';
import { useQuery } from '@apollo/client'
import { businessShiftsPendingApplications } from '../../utils/BusinessQueries';


// Main landing page for businesses to review applicants. Renders the additional components used
// in managing applicants.
// ShiftOverviewCard - renders a list of shifts that contain applicants for a business to review
// ShiftApplicantReviewCard - Renders the individual cards used to review applicants on a one by one basis.
export default function ApplicantsPage({ business }) {

    const { loading, error, data, startPolling, stopPolling } = useQuery(businessShiftsPendingApplications(business.id, true, true));

    useEffect(() => {
        startPolling(500);
        return function cleanUp() {
            stopPolling();
        }
    })

    return loading
        ? <DefaultLoading />
        : (
            <main className='application-review'>
                <h1 className='application-review__heading'>Review Applicants</h1>

                <Switch>
                    <Route path='/business/applicants' render={() => {
                        return (
                            <ul className='application-review__shift-list'>
                                {data.businessShifts.length === 0
                                    ? <li className='application-review__no-applicants'>
                                        <h2 className='application-review__no-applicants-header'>
                                            No applicants to review yet, hang tight! <br /><br />We will update this space as soon as you have a shift with applicants to review.
                                    </h2>
                                    </li>
                                    : data.businessShifts.map((shift) => <ShiftOverviewCard key={shift.id} shift={shift} />)}
                            </ul>
                        )
                    }} exact />

                    <Route path='/business/applicants/review/:shiftID' render={(routerProps) => <ShiftApplicantReviewCard routerProps={routerProps} />
                    } />

                </Switch>
            </main>
        )

}