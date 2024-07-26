import React from 'react';
import {  Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const ChartOne = ({vanNass}) => {

    const statusChart = {
        datasets: [
            {
                label: "statusChart",
                data: vanNass,
                backgroundColor: ["#1B75BC", "#A4D1F4", "#ECF7FF"],
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
            }}
        />
    )
}

export default ChartOne