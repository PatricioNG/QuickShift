import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { userQuery } from './components/utils/Queries';
import moment from 'moment';

//Component Pages
import ApplyForShiftPage from './components/candidates/shift-application/ApplyForShiftPage';
import CompletedShiftDetails from './components/candidates/shift-details/CompletedShiftDetails';
import DefaultLoading from './components/shared/DefaultLoading';
import FindShifts from './components/candidates/shift-application/FindShifts';
import Header from './components/shared/Header';
import LandingPage from './components/candidates/LandingPage';
import MessagesPage from './components/shared/messages-page/MessagesPage';
import ShiftDetails from './components/candidates/shift-cards/ShiftDetails'
import UserShiftsCompletedShifts from './components/candidates/shift-details/UserShiftsCompletedShifts';
import UserShiftsLandingPage from './components/candidates/shift-details/UserShiftsLandingPage';
import UserShiftsUpcoming from './components/candidates/shift-details/UserShiftsUpcoming';
import NewUserSetup from './components/candidates/new-user/NewUserSetup';

//Main component for rendering candidates and candidate pages
export default function Candidates({ userID, routerProps }) {

    console.log('render');
    const { loading, data, refetch } = useQuery(userQuery(userID));

    console.log('userdataa', data)
    const timeStamp = moment().toISOString(true);

    //Candidate nav menu
    const candidateLinks = [
        { to: '/candidate', title: 'Home' },
        { to: '/candidate/shifts', title: 'Find Shifts' },
        { to: '/candidate/shifts/upcoming', title: 'Upcoming Shifts' },
        { to: '/candidate/shifts/home', title: 'My Schedule' },
        { to: '/candidate/shifts/previous', title: 'Previous Shifts' },
        { to: '/candidate/messages', title: 'Messages' },
        { to: '/', title: 'Log Out' }
    ];

    return loading ? <DefaultLoading />
        : (
            <>
                <Switch>
                    <Route path='/candidate' render={() => <Header linkTo="candidate" links={candidateLinks} />} exact />
                    <Route path='/candidate/new/setup' render={() => <></>} />
                    <Route path='/candidate/*' render={() => <Header className='main-nav--secondary' linkTo="candidate" links={candidateLinks} />} />
                </Switch>
                <Switch>
                    <Route path='/candidate' render={() => {
                        return data.user.new_user ? routerProps.history.push('/candidate/new/setup') : <LandingPage user={data.user} timeStamp={timeStamp} />
                    }} exact />
                    <Route path='/candidate/new/setup' render={(routerProps) => <NewUserSetup routerProps={routerProps} newUser={data.user} refetch={refetch} />} />
                    <Route path={['/candidate/shifts', '/candidate/shifts/applications']} render={() => <FindShifts user={data.user} />} exact />
                    <Route path='/candidate/shifts/upcoming' render={() => <UserShiftsUpcoming user={data.user} timeStamp={timeStamp} />} />
                    <Route path='/candidate/shifts/home' render={(routerProps) => <UserShiftsLandingPage routerProps={routerProps} user={data.user} />} />
                    <Route path='/candidate/shift/:id' render={(routerProps) => <ShiftDetails routerProps={routerProps} />} exact />
                    <Route path='/candidate/shifts/previous' render={() => <UserShiftsCompletedShifts user={data.user} />} />
                    <Route path='/candidate/shift/:id/completed' render={(routerProps) => <CompletedShiftDetails routerProps={routerProps} user={data.user} />} />
                    <Route path='/candidate/shift/:id/apply' render={(routerProps) => <ApplyForShiftPage routerProps={routerProps} user={data.user} />} />
                    <Route path='/candidate/messages' render={(routerProps) => <MessagesPage user={data.user} destination={"user"} routerProps={routerProps} />} />
                </Switch >
            </>
        );
}