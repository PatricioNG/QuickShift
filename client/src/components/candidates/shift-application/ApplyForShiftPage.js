import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import DefaultLoading from '../../shared/DefaultLoading';
import ApplyForShiftForm from './ApplyForShiftForm';
import { useQuery } from '@apollo/client'
import { shiftQuery } from '../../utils/Queries'

//Main component for the application page form and the confirmation screen
export default function ApplyForShiftPage({ routerProps, user }) {
    const { id } = routerProps.match.params;

    const { loading, data } = useQuery(shiftQuery(id));

    return loading
        ? <DefaultLoading />
        : (
            <main className='shift-application'>
                <Switch>
                    <Route path={`/candidate/shift/${routerProps.match.params.id}/apply`} render={(routerProps) => <ApplyForShiftForm routerProps={routerProps} shiftDetails={data.shift} user={user} />} exact />
                    <Route path={`/candidate/shift/${routerProps.match.params.id}/apply/confirmation`} render={() => {
                        return (
                            <section className='shift-application__confirmation-message-wrapper'>
                                <h2 className='shift-application__confirmation-header'>Application Submitted</h2>
                                <p className='shift-application__confirmation-message'>Keep an eye on your messages, {user.first_name}, once your application is reviewed you'll recieve an update.</p>
                                <span className='shift-application__confirmation-action-wrapper'>
                                    <Link className='shift-application__action-link' to='/candidate/messages'>
                                        <button className='shift-application__button'>Go To Messages</button>
                                    </Link>
                                    <Link className='shift-application__action-link' to='/candidate/shifts'>
                                        <button className='shift-application__button'>Apply To More Shifts</button>
                                    </Link>
                                </span>
                            </section>
                        )
                    }} />

                </Switch>

            </main>
        )
}