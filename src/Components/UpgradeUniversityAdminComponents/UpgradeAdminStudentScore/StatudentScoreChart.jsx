
import React from 'react';
import {  Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const StatudentScoreChart = ({ graphPercentages}) => {
    const isBelowThreshold = (currentValue) => currentValue === 0;
    let isDataExists = graphPercentages.every(isBelowThreshold)
    const statusChart = {
        datasets: [
            {
                label: "statusChart",
                data: isDataExists ? [100] : graphPercentages,
                backgroundColor: isDataExists ? ["#EDEDED"] : ["#1B75BC", "#A4D1F4", "#ECF7FF"],
                hoverOffset: 4,
            },
        ]
    }


    return (
        <Doughnut
            data={statusChart}
            options={{
                elements: {
                    arc: {
                        borderRadius: "99",
                        borderWidth: 1,
                        borderColor: "transparent",
                    },
                },
                spacing: 10,
                cutout: 45,
                plugins: {
                    tooltip: !isDataExists && true,
                }
            }}
        />
    )
}

export default StatudentScoreChart