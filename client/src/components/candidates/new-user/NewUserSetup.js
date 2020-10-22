import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client'
import { updateUser } from '../../utils/Queries';

// Component to capture new user accounts authenticated through AuthO and
// Set basic information for the user.
export default function NewUserSetup({ newUser, refetch, routerProps }) {

    // Sets the user's information based on form entry
    const [updateUserDetails] = useMutation(updateUser());

    useEffect(() => {
        // Checks if the user is new, if user is already set up, skips setup
        if (!newUser.new_user) routerProps.history.push('/candidate');
    })

    // Submits form entry to update new user details.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserDetails({
            variables: {
                email: e.target.userEmail.value,
                firstName: e.target.userFirstName.value,
                lastName: e.target.userLastName.value
            }
        }).then(() => {
            refetch();
            routerProps.history.push('/candidate')
        })
    }

    return (
        <main className='new-user'>
            <h1 className='new-user__heading'>Welcome to QuickShift!</h1>
            <form className='new-user__form' onSubmit={(e) => { handleSubmit(e) }}>

                <h2 className='new-user__sub-heading'>Let's get you set up.</h2>
                <label className='new-user__label'>
                    First Name
                    <input required className='new-user__text-input' type="text" name="userFirstName" placeholder="Enter your first name"></input>
                </label>
                <label className='new-user__label'>
                    Last Name
                    <input required className='new-user__text-input' type="text" name="userLastName" placeholder="Enter your last name"></input>
                </label>
                <label className='new-user__label'>
                    Email
                    <input className='new-user__text-input new-user__text-input--read-only' type="text" name="userEmail" value={newUser.email} readOnly></input>
                </label>
                <button className='new-user__submit'>Submit</button>

            </form>
        </main >
    )
}