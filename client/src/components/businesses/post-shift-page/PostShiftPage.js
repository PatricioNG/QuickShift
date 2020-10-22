import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostShiftConfirmation from './PostShiftConfirmation';
import PostShiftForm from './PostShiftForm';

//Main component to handle rendering the shift form and confirmation page
export default function PostShiftPage({ business }) {

    const [shiftDetails, setShiftDetails] = useState(null);

    //Used to update the shift details from the form component
    //and then pass over to the confirmation
    const updateShift = (shiftForm) => {
        setShiftDetails(shiftForm);
    }

    return (
        <main className='post-shift-page'>
            <h1 className='post-shift-page__heading'>Post A New Shift</h1>
            <Switch>
                {shiftDetails === null && <Route path='/business/post-shifts' render={(routerProps) => <PostShiftForm routerProps={routerProps} updateShift={updateShift} />} />}
                {shiftDetails !== null && <Route path='/business/post-shifts/confirm' render={(routerProps) => <PostShiftConfirmation business={business} shiftDetails={shiftDetails} routerProps={routerProps} />} />}
            </Switch>
        </main>
    )

}