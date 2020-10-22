import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { businessQuery } from './components/utils/BusinessQueries'

//Component pages
import ApplicantsPage from './components/businesses/applicants-page/ApplicantsPage';
import DefaultLoading from './components/shared/DefaultLoading';
import Header from './components/shared/Header';
import InvoicesPage from './components/businesses/invoices-page/InvoicesPage';
import LandingPage from './components/businesses/LandingPage';
import MessagesPage from './components/shared/messages-page/MessagesPage';
import MyBusinessPage from './components/businesses/my-business-page/MyBusinessPage';
import PostShiftPage from './components/businesses/post-shift-page/PostShiftPage';

//Main component for rendering businesses and business pages
export default function Businesses({ userID }) {

    const { loading, error, data } = useQuery(businessQuery(userID));

    //Navigation links
    const businessLinks = [
        { to: '/business', title: 'Home' },
        { to: '/business/post-shifts', title: 'Post A Shift' },
        { to: '/business/messages', title: 'Messages' },
        { to: '/business/applicants', title: 'Applicants' },
        { to: '/business/profile', title: 'My Business' },
        { to: '/business/invoices', title: 'View Invoices' },
        { to: '/', title: 'Log Out' }
    ]

    return loading
        ? <DefaultLoading />
        : (
            <>
                <Switch>
                    <Route path='/business/profile' render={() => <Header className='main-nav' links={businessLinks} linkTo="business" />} exact />
                    <Route path='/business' render={() => <Header className='main-nav--secondary' links={businessLinks} linkTo="business" />} />
                </Switch>
                <Switch>
                    <Route path='/business' render={() => <LandingPage business={data.business} />} exact />
                    <Route path='/business/post-shifts' render={() => <PostShiftPage business={data.business} />} />
                    <Route path='/business/applicants' render={() => <ApplicantsPage business={data.business} />} />
                    <Route path='/business/invoices' render={() => <InvoicesPage business={data.business} />} />
                    <Route path='/business/profile' render={() => <MyBusinessPage business={data.business} />} />
                    <Route path='/business/messages' render={(routerProps) => <MessagesPage user={data.business} destination='business' routerProps={routerProps} />} />
                </Switch>
            </>
        )

}
