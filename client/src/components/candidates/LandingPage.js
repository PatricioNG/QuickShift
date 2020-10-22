import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageAvatar from '../shared/avatars/ImageAvatar';
import DefaultLoading from '../shared/DefaultLoading';
import NextShiftCard from './shift-cards/NextShiftCard';
import { useQuery } from '@apollo/client'
import { nextShiftsQuery } from '../utils/Queries';

//Main landing page component for candidate views
export default function LandingPage({ user, timeStamp }) {

    const { loading, data, startPolling, stopPolling } = useQuery(nextShiftsQuery(timeStamp), {
        variables: {
            userID: user.id,
        }
    })

    useEffect(() => {
        startPolling(2000);
        return function cleanup() {
            stopPolling();
        }
    })

    return loading
        ? <DefaultLoading />
        : (
            <main className='candidates-home'>
                <div className='candidates-home__nav-wrapper'>
                    <header className='candidates-home__header-wrapper'>
                        <h1 className='candidates-home__heading'>Hello, {user.first_name}.</h1>
                        <div className='candidates-home__profile-wrapper'>
                            <ImageAvatar src={user.profile_image_link} size='medium' shadow={true} />
                        </div>
                        <section className="candidates-home__upcoming-shifts">
                            <p className='candidates-home__shift-count'>
                                <Link to="/candidate/shifts/upcoming">
                                    {loading ? 0 : data.userNextShifts.length}
                                </Link>
                            </p>
                            <p className='candidates-home__shift-message'>Upcoming {
                                `${!loading &&
                                    data.userNextShifts.length === 0
                                    || data.userNextShifts.length > 1
                                    ? 'shifts'
                                    : 'shift'}`} scheduled.</p>
                        </section>
                    </header>
                </div>
                <NextShiftCard nextShift={!loading && data.userNextShifts.length === 0 ? null : data.userNextShifts[0]} />
            </main>
        )

}