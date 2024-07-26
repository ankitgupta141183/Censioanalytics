import React  from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerables);
const AdminLineGraph = () => {
    // const Dates = Object.keys(ProfileVIew.total_cloud_experts)
    // const total_cloud_experts = Object.values(ProfileVIew.total_cloud_experts)
    // const total_managers = Object.values(ProfileVIew.total_managers)
    const ChartData = {
        labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            type: "line",
            label: "Pending Assessments",
            borderColor:"#ff5b37",
            lineTension: 0.4,
            data: [10, 23, 18, 21,45,67,37,89,56,70,13 , 13],
            backgroundColor: "#ffc9bd",
            fill: true,
        },
        {
            type: "line",
            label: "Completed Assessments",
            borderColor:"#feb019",
            data: [45 , 45 , 23 ,49 ,89,67,12,24,35,67,12,29] ,
            backgroundColor: "#fed1a6",
            fill: true,
            lineTension: 0.4
        },
    ]

    }
    // total_managers.push(10)
    return (
        <div className='admin-overview-graph'>
          <Chart data={ChartData}  options={{
                responsive: true,
                // maintainAspectRatio: false,
                plugins:{
                    tooltip:{
                        usePointStyle: true,
                        // boxWidth:10
                        // position:"top"
                    },
                    title:{
                        display:true,
                        text:"",
                        font:{size:24}
                    },
                    legend: {
                        labels: {
                            usePointStyle: true,
                            // boxWidth: 10
                          },
                        // display: true, //This will do the task
                     },
                   
                },
    

            }} />
        </div>
    )
}

export default AdminLineGraph;