import React from 'react';
import Calendar from '../../shared/Calendar'
import DefaultLoading from '../../shared/DefaultLoading';
import { formatEvents } from '../../utils/FormatUtils'
import { useQuery } from '@apollo/client'
import { userShiftsQuery } from '../../utils/Queries';

//Landing page for the calendar view for a user's shifts
export default function UserShiftsLandingPage({ user, routerProps }) {

    const { loading, data } = useQuery(userShiftsQuery(user.id));

    return loading
        ? <DefaultLoading />
        : (
            <main className='user-shifts-home'>
                <h1 className='user-shifts-home__heading'>Your Month At A Glance</h1>
                <Calendar routerProps={routerProps} className='user-shifts-home__calendar' events={formatEvents(data.userShifts)}></Calendar>
            </main>
        )


}