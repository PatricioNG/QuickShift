import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

//Component to render a calendar based on event data passed back into the calendar as props
export default function ShiftCalendar({ className, routerProps, events }) {

    const localizer = momentLocalizer(moment);

    return (
        <div className={`calendar ${className}-container`}>
            <Calendar className={className}
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                defaultView={'month'}
                views={['month']}
                toolbar={true}
                onSelectEvent={(event) => {
                    moment(event.start) < moment()
                        ? routerProps.history.push(`/candidate/shift/${event.shiftID}/completed`)
                        : routerProps.history.push(`/candidate/shift/${event.shiftID}`);
                }}
            />
        </div>
    )


}