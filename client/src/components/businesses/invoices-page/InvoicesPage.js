import React from 'react';
import DefaultLoading from '../../shared/DefaultLoading';
import InvoicesOverviewCard from './InvoicesOverviewCard';
import { useQuery } from '@apollo/client'
import { businessInvoicedShiftsQuery } from '../../utils/BusinessQueries';

// Main component for rendering the list of previous shifts with invoices
// that can be downloaded in pdf format
export default function InvoicesPage({ business }) {

    const { loading, error, data } = useQuery(businessInvoicedShiftsQuery(business.id))

    return loading
        ? <DefaultLoading />
        : (
            <main className='invoices-page'>

                <h1 className='invoices-page__heading'>View Your Invoices</h1>
                <ul className='invoices-page__shift-list'>
                    {data.invoicedShifts.length === 0
                        ? <li className='invoices-page__no-invoices'>
                            <h2 className='invoices-page__no-invoices-heading'>
                                No invoices yet. <br /><br />Once your first shift is filled you can download the invoices here.
                            </h2>
                        </li>
                        : data.invoicedShifts.map((shift) => <InvoicesOverviewCard key={shift.id} shift={shift} />)}
                </ul>

            </main>
        )
}