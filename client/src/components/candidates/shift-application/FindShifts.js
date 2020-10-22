import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PendingApplicationCard from '../shift-cards/PendingApplicationCard';
import ShiftCard from '../shift-cards/ShiftCard';
import { useQuery } from '@apollo/client'
import { pendingShiftsApplicationsQuery } from '../../utils/Queries'
import DefaultLoading from '../../shared/DefaultLoading';

//Main component for rendering available and pending shifts
export default function FindShifts({ user }) {

    const { loading, data } = useQuery(pendingShiftsApplicationsQuery(user.id),
        { fetchPolicy: "network-only" });

    return loading
        ? <DefaultLoading />
        : (
            <main className='candidates-find-shift'>
                <header className='candidates-find-shift__heading-wrapper'>
                    <Switch>

                        <Route path='/candidate/shifts' render={() => {
                            return (
                                <>
                                    <h1 className='candidates-find-shift__heading'>Shifts Near You</h1>
                                    <Link className='candidates-find-shift__pending-app-link' to='/candidate/shifts/applications'>
                                        <button className='candidates-find-shift__pending-app-button'>Pending Applications
                                    <span className='candidates-find-shift__pending-app-arrow'>
                                                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 10L5 5L0 0V10Z" fill="#003e19" />
                                                </svg>
                                            </span>
                                        </button>
                                    </Link>
                                </>
                            )
                        }} exact />

                        <Route path='/candidate/shifts/applications' render={() => {
                            return (
                                <>
                                    <Link className='candidates-find-shift__pending-app-link' to='/candidate/shifts'>
                                        <button className='candidates-find-shift__back-button'>Back to Shifts
                                            <span className='candidates-find-shift__back-arrow'>
                                                <svg className='shift-details__back-icon' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 0L0.5 5L5.5 10V0Z" fill="#003e19" />
                                                </svg>
                                            </span>
                                        </button>
                                    </Link>
                                    <h1 className='candidates-find-shift__heading candidates-find-shift__heading--back'>Pending Applications</h1>
                                </>
                            )
                        }} />

                    </Switch>
                </header>

                <ul className="candidates-find-shift__shift-list">
                    <Switch>
                        <Route path='/candidate/shifts' render={() => {
                            return data.pendingShifts.length === 0
                                ? <li className='candidates-find-shift__no-shifts'>
                                    <h2 className='candidates-find-shift__no-shifts-heading'>
                                        No shifts available right now, check back soon!
                                    </h2>
                                </li>
                                : data.pendingShifts.map((shift) => <ShiftCard key={shift.id} data={shift} detailsLink={`/candidate/shift/${shift.id}`} />)
                        }} exact />

                        <Route path='/candidate/shifts/applications' render={() => {
                            return data.pendingApplications.length === 0
                                ? <li className='candidates-find-shift__no-applications'>
                                    <h2 className='candidates-find-shift__no-applications-heading'>
                                        No pending applications, why not apply for a shift?
                                    </h2>
                                </li>
                                : data.pendingApplications.map((shift) => <PendingApplicationCard key={shift.id} data={shift} />)
                        }} />

                    </Switch>
                </ul>
            </main>

        )
}