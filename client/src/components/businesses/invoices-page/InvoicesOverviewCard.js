import React from 'react';
import { formatEarnings } from '../../utils/FormatUtils';
import moment from 'moment';

// Individual list item to display in the invoices overview list
// Provides toggle to download invoice based on previous shift in .pdf format
export default function InvoicesOverviewCard({ shift }) {

    const handleDownloadClick = () => {
        // Note: Initially built out via PDFKit with functional PDF generation on
        // the back end, but implementation on the front end was paused in time for
        // project submission. 
    }

    return (
        <li className='invoices-overview-card'>

            <span className='invoices-overview-card__content-block'>
                <p className='invoices-overview-card__block-header'>Role</p>
                <p className='invoices-overview-card__block-content'>{shift.role}</p>
            </span>

            <span className='invoices-overview-card__content-block'>
                <p className='invoices-overview-card__block-header'>Date</p>
                <p className='invoices-overview-card__block-content'>
                    {moment(shift.start_time).format('ddd MMM Do')}</p>
                <p className='invoices-overview-card__block-content'>
                    {moment(shift.start_time).format('h:mm a')} -<br />{moment(shift.end_time).format('h:mm a')}
                </p>
            </span>

            <span className='invoices-overview-card__content-block'>
                <p className='invoices-overview-card__block-header'>Total</p>
                <p className='invoices-overview-card__block-content'>${formatEarnings(moment(shift.end_time).diff(moment(shift.start_time), 'minutes'), shift.rate)}</p>
            </span>

            <span className='invoices-overview-card__content-block'>
                <p className='invoices-overview-card__block-header'>Download</p>
                <span className='invoices-overview-card__download-wrapper'>
                    <button onClick={handleDownloadClick} className='invoices-overview-card__download-button'>
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 6.5H10V0.5H4V6.5H0L7 13.5L14 6.5ZM6 8.5V2.5H8V8.5H9.17L7 10.67L4.83 8.5H6ZM14 17.5V15.5H0V17.5H14Z" fill="white" />
                        </svg>
                    </button>
                </span>
            </span>
        </li>
    )
}