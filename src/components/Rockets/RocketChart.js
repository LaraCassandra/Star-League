import React, { Fragment, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export const RocketChart = () => {
  const [chartData, setChartData] = useState({});
  //const [successRate, setSuccessRate] = useState({});

  const chart = () => {
    let rocketHeight = [];
    let rocketMass = [];
    let rocketName = [];

    axios
      .get("https://api.spacexdata.com/v3/rockets")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
          rocketHeight.push(parseInt(dataObj.height.meters));
          rocketMass.push(parseInt(dataObj.height.meters));
          rocketName.push(dataObj.rocket_name);
        }
        setChartData({
          labels: rocketName,
          datasets: [
            {
              label: "Height in Metres",
              data: rocketHeight,
              borderWidth: 3,
              borderColor: ["#07a3b2", "purple", "red", "orange"],
              hoverBackgroundColor: ["#07a3b2", "purple", "red", "orange"],
              hoverBorderColor: "black",
              barThickness: 80,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <Fragment>
      <div>
        <Bar
          data={chartData}
          option={{
            responsive: true,
            title: {
              text: "Mass in KG",
              display: true,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: true,
                },
              ],
            },
          }}
        />
      </div>
    </Fragment>
  );
};

export default RocketChart;
