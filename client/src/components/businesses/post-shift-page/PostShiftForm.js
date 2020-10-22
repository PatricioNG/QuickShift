import React from 'react'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { formatShiftForm } from '../../utils/FormatUtils';

//Renders the input form for businesses creating a new shift
export default function PostShiftForm({ updateShift, routerProps }) {

    //Formats the data entered into a proper shift structure and
    //updates to state on the main component to pass over to the confirmation
    //screen
    const handleSubmit = (event) => {
        event.preventDefault();
        updateShift(formatShiftForm(event.target,
            moment(`${event.target.roleDate.value}T${event.target.roleStart.value}`).format(),
            moment(`${event.target.roleDate.value}T${event.target.roleEnd.value}`).format()
        ));
        routerProps.history.push('/business/post-shifts/confirm');
    }

    return (
        <form className='new-shift-form' onSubmit={(e) => handleSubmit(e)}>
            <section className='new-shift-form__wrapper'>
                <h2 className='new-shift-form__section-header'>Shift Details</h2>
                <label className='new-shift-form__label'>
                    Role
                    <input required name='roleTitle' className='new-shift-form__input' type='text' placeholder='Role Title' />
                </label>
                <label className='new-shift-form__label'>
                    Hourly Rate
                    <input required name='roleRate' className='new-shift-form__input' type='number' step='any' placeholder='Role Rate' />
                </label>
                <label className='new-shift-form__label'>
                    Responsibilities
                    <textarea required name='roleDescription' className='new-shift-form__input new-shift-form__input--text-area' type='text' placeholder='Role Description'></textarea>
                </label>
            </section>

            <section className='new-shift-form__wrapper'>
                <h2 className='new-shift-form__section-header'>Shift Time</h2>
                <label className='new-shift-form__label'>
                    Date
                    <input required name='roleDate' className='new-shift-form__input' type='date' />
                </label>
                <label className='new-shift-form__label'>
                    Start Time
                    <TimePicker allowEmpty={false} name='roleStart' className='new-shift-form__time-picker' defaultValue={moment().hour(9).minute(0)} showSecond={false} minuteStep={15} />
                </label>
                <label className='new-shift-form__label'>
                    End Time
                    <TimePicker allowEmpty={false} name='roleEnd' className='new-shift-form__time-picker' defaultValue={moment().hour(12).minute(0)} showSecond={false} minuteStep={15} />
                </label>
            </section>

            <section className='new-shift-form__wrapper new-shift-form__wrapper--bottom'>
                <button className='new-shift-form__submit-button'>
                    Confirm Details
                </button>
            </section>
        </form>
    )
}