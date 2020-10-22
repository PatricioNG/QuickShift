import moment from 'moment';

//Used to format the data for a google api request
export const formatMapsAddressString = (address, postal, city, province) => {
    return `${address.replace(/\s/g, '+')},+${city.replace(/\s/g, '+')},+${province.replace(/\s/g, '+')},+${postal.replace(/\s/g, '+')}`;
}

//Used to format the data for react-big-calendar components
export const formatEvents = (shifts) => {
    return shifts.map((shift) => {
        return {
            title: shift.role,
            start: shift.start_time,
            end: shift.end_time,
            shiftID: shift.id,
        }
    })
}

//Used to calculate and format the earnings for a shift
export const formatEarnings = (minutes, rate) => {
    let hours = (minutes / 60).toPrecision(3)
    return (rate * hours) < 100
        ? (rate * hours).toPrecision(4)
        : (rate * hours).toPrecision(5);
}

//Used to format the data for the chart.js doughnut chart
export const formatChartData = (shifts) => {
    let filled = 0;
    let open = 0;
    shifts.forEach((shift) => {
        !shift.pending
            ? filled++
            : open++;
    })
    return [filled, open];
}

//Used to format the data from a new shift form
export const formatShiftForm = (target, startTime, endTime) => {
    return {
        title: target.roleTitle.value,
        rate: parseFloat(target.roleRate.value),
        description: target.roleDescription.value,
        start: startTime,
        end: endTime
    }
}

//Used to prepare the data for pdf.kit PDF generation
export const formatPDFData = (shift, business) => {
    return {
        shift: {
            id: shift.id,
            date: moment(shift.start_time).format('Do[/]DDD[/]YYYY'),
            start_time: moment(shift.start_time).format('h:mm a'),
            end_time: moment(shift.end_time).format('h:mm a'),
            role: shift.role,
            rate: shift.rate,
            hours: moment(shift.end_time).diff(moment(shift.start_time), 'hours', true),
            total: (shift.rate * moment(shift.end_time).diff(moment(shift.start_time), 'hours', true)),
        },
        business: business
    }
}