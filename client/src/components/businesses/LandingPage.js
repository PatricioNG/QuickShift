import React, { useEffect } from 'react';
import Slider from 'react-slick';
import DoughnutChart from '../shared/charts/DoughnutChart'
import DefaultLoading from '../shared/DefaultLoading';
import { formatChartData } from '../utils/FormatUtils';
import BusinessShiftCard from './shiftCards/BusinessShiftCard';
import { useQuery } from '@apollo/client'
import { businessLandingPageQuery } from '../utils/BusinessQueries';
import { Link } from 'react-router-dom';

//Renders the landing page component for businesses
export default function LandingPage({ business }) {

    const { loading, data, startPolling, stopPolling } = useQuery(businessLandingPageQuery(business.id, [false, true], [true, true]), { fetchPolicy: "cache-and-network" })

    //Returns the proper format for chart.js
    let chartData = loading ? null : formatChartData(data.shifts);

    useEffect(() => {
        startPolling(2000);
        return function cleanup() {
            stopPolling();
        }
    })

    //Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return loading
        ? <DefaultLoading />
        : (
            <main className='businesses-home'>
                <h1 className='businesses-home__page-heading'>Hello, {business.name}.</h1>

                <section className='businesses-home__shift-chart-wrapper'>
                    {/* Datapoint 1 == filled shifts, 2 == open shifts */}
                    {data.shifts.length > 0
                        ? <>
                            <DoughnutChart className='businesses-home__chart' data={chartData}>
                            </DoughnutChart>
                            <p className='businesses-home__chart-message'>{chartData[1] > 0
                                ? `Looks like you have ${chartData[1]} ` + (chartData[1] > 1 ? 'shifts left to fill.' : 'shift left to fill.')
                                : 'You\'ve filled all your shifts, would you like to post another?'}</p>
                        </>
                        : <h2 className='businesses-home__no-historical-shifts'>Psst... Once you've started posting shifts, this area will keep track of how many you've filled.</h2>}
                </section>

                <section className='businesses-home__applicants'>
                    <h2 className='businesses-home__subheader'>
                        Applicants
                    </h2>
                    <div className='businesses-home__applicants-wrapper'>
                        <span className='businesses-home__applicants-callout'>
                            <p className='businesses-home__applicants-data'>
                                <Link className='businesses-home__applicants-data' to="/business/applicants">
                                    {data.applications.length}
                                </Link>
                            </p>
                            <p className='businesses-home__applicants-legend'>Applicants to review</p>
                        </span>
                        <span className='businesses-home__applicants-callout businesses-home__applicants-callout--secondary'>
                            <p className='businesses-home__applicants-data'>0</p>
                            <p className='businesses-home__applicants-legend'>Offers awaiting a response</p>
                        </span>
                    </div>
                </section>

                <section className='businesses-home__upcoming-shifts'>
                    <h2 className='businesses-home__subheader'>
                        Upcoming Shifts
                    </h2>
                    {data.upcomingShifts === null
                        ? <DefaultLoading />
                        : <Slider {...settings} className='businesses-home__upcoming-shifts-list'>
                            {data.upcomingShifts.length === 0
                                ? <li className='businesses-home__no-shifts'>
                                    <h2 className='businesses-home__no-shifts-heading'>
                                        There's no filled shifts coming up yet.<br /><br />Once you have a filled shift coming up you'll see the shift here!
                                </h2>
                                </li>
                                : data.upcomingShifts.map((shift) => <BusinessShiftCard key={shift.id} shift={shift} />)}
                        </Slider>}
                </section>

            </main>
        )
};