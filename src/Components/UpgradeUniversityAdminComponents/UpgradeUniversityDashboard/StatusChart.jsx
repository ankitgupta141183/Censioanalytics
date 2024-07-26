import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement , Tooltip } from 'chart.js'
Chart.register(ArcElement);
Chart.register([Tooltip])
const StatusChart = ({udcTotal}) => {
    const statusChart = {
        datasets: [
            {
                label: "statusChart",
                data: udcTotal,
                backgroundColor: ["#1B75BC", "#A4D1F4", "#ECF7FF"],
                hoverOffset: 4,
            },
        ]
    }
    return (
        <Doughnut
            data={statusChart}
            options={{
                showTooltips: true,
                elements: {
                    arc: {
                        borderRadius: "99",
                        borderWidth: 1,
                        borderColor: "transparent",
                    },
                },
                plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Line Chart - Cubic interpolation mode'
                    },
                  },
                spacing: 10,
                cutout: 65,
            }}
            
        />
    )
}

export default StatusChart