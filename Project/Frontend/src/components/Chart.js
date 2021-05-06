import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { LoopCircleLoading } from 'react-loadingg';
import SingleChart from './SingleChart';
import { Link, Redirect, useParams } from 'react-router-dom';
import './chart.css'

var options = {
  maintainAspectRatio: true,
  layout: {
    padding: {
      right: 25,
      left: 25,
    },
  },
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label(tooltipItems, data) {
        return `$${tooltipItems.yLabel}`;
      },
    },
    displayColors: false,
  },
  hover: {
    mode: "index",
    intersect: false,
  },
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    fontStyle: "bold",
    yAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        fontStyle: "bold",

        ticks: {
          callback(value) {
            return "$" + value.toFixed(2);
          },
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderCapStyle: "round",
      borderJoinStyle: "round",
    },
  },
};

function Chart(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const [data, setdata] = useState({});
  const [error, seterror] = useState(null);


  function toggle() {
    fetch(`${process.env.REACT_APP_API}/${props.symbol}/${props.curSelection}?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          let chartData = [];
          let chartLabels = [];
          for (let i = 0; i < result.length; i++) {
            if (result[i].average !== null) {
              if (props.curSelection != "intraday-prices" || (props.curSelection == "intraday-prices" && i % 5 == 0)) {
                chartData.push(result[i].close.toFixed(2));
                chartLabels.push(result[i].label);
              }
            }
          }
          setisLoaded(true);
          setdata({
            labels: chartLabels,
            datasets: [
              {
                label: props.symbol,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: chartData
              }
            ]
          })
        },
        (error) => {
          setisLoaded(true);
          seterror(error)

        }
      )
  }


  useEffect(() => {
    toggle()
  }, [props.symbol, props.curSelection])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><LoopCircleLoading /></div>;
  } else {
    return (
      <div>
        <div>
          <Line
            data={data}
            height={300}
            options={options}
          />
        </div>

      </div>
    );
  }

}
export default Chart