import React from 'react';
import ShiftCard from '../shift-cards/ShiftCard';
import DefaultLoading from '../../shared/DefaultLoading';
import { useQuery, gql } from '@apollo/client'
import { upcomingShiftsQuery } from '../../utils/Queries';

//Main component to render the upcoming shift card view
export default function UserShiftsUpcoming({ user, timeStamp }) {

    const { loading, error, data } = useQuery(upcomingShiftsQuery(user.id, timeStamp));

    return loading
        ? <DefaultLoading />
        : (
            <main className='candidates-upcoming-shift'>
                <header className='candidates-upcoming-shift__header'>
                    <h1 className='candidates-upcoming-shift__heading'>Upcoming Shifts</h1>
                </header>
                <ul className="candidates-upcoming-shift__shift-list">
                    {data.userNextShifts.length === 0
                        ? <li className='candidates-upcoming-shift__no-shifts'>
                            <h2 className='candidates-upcoming-shift__no-shift-header'>You don't have any upcoming shifts yet, try applying for some now!</h2>
                        </li>
                        : data.userNextShifts.map((shift) => <ShiftCard data={shift} detailsLink={`/candidate/shift/${shift.id}`} />)}
                </ul>
            </main>
        )
}