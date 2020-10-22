import React from 'react'
import DefaultLoading from '../../shared/DefaultLoading';
import ShiftCard from '../shift-cards/ShiftCard';
import { useQuery } from '@apollo/client'
import { completedShiftQuery } from '../../utils/Queries';

//Main page for showing completed shift cards
export default function UserShiftsCompletedShifts({ user }) {

    const { loading, data } = useQuery(completedShiftQuery(user.id));

    return loading
        ? <DefaultLoading />
        : (
            <main className='candidate-completed-shifts'>
                <h1 className='candidate-completed-shifts__heading'>Completed Shifts</h1>
                <ul className='candidate-completed-shifts__shift-list'>
                    {data.userCompletedShifts.length === 0
                        ? <li className='candidate-completed-shifts__no-shifts'>
                            <h2 className='candidate-completed-shifts__no-shifts-heading'>
                                You haven't completed any shifts yet, why not apply for some now?
                            </h2>
                        </li>
                        : data.userCompletedShifts.map((shift) => {
                            return <ShiftCard key={shift.id} data={shift} detailsLink={`/candidate/shift/${shift.id}/completed`} />
                        })}
                </ul>
            </main>
        )
}