import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

//Doughnut chart component from Charts.js that accepts chart data for 
//two data points and a heading as a child component
export default class DoughnutChart extends Component {

    //First data point passed in will be filled shifts,
    //second will be open shifts
    render() {
        return (
            <div className='chart-wrapper'>
                <Doughnut data={
                    {
                        labels: ['Filled Shifts', 'Open Shifts'],
                        datasets: [{
                            label: 'shifts',
                            data: this.props.data,
                            backgroundColor: [
                                '#028C6A',
                                '#7BC5AE'
                            ]
                        }],
                    }}

                    options={{
                        legend: {
                            display: true,
                            position: 'bottom',
                            onClick: null,
                            labels: {
                                fontFamily: 'Lato'
                            }
                        },
                        responsive: true
                    }}


                />
                <h2 className='chart-wrapper__heading'>{this.props.children}</h2>
            </div>
        )
    }
}