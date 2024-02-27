import React, { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../admin/customHooks/useFetch";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const Dashboard = () => {
  const reserveApi = "http://localhost:8080/reserve";
  const futsalApi = "http://localhost:8080/futsal";
  const userApi = "http://localhost:8080/user";
  const messageApi = "http://localhost:8080/message";

  const { fetchData: futsal, fetchError: futsalerror } = useFetch(futsalApi);

  const { fetchData: user, fetchError: usererror } = useFetch(userApi);

  const { fetchData: message, fetchError: messageerror } = useFetch(messageApi);

  const { fetchData, setFetchData, fetchDatafunc, fetchError } =
    useFetch(reserveApi);

  console.log(fetchData);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsFetchLoading(false);
    }, 1000);
  }, []);

  if (isFetchLoading) {
    return (
      <div class="box">
        <div class="shadow"></div>
        <div class="gravity">
          <div class="ball"></div>
        </div>
      </div>
    );
  }

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Number of Bookings in this Week",
        data: [8, 3, 5, 4, 2, 8, 10],
        backgroundColor: "LimeGreen",
        borderColor: "Black",
        pointBorderColor: "limegreen",
        fill: false,
      },
    ],
  };

  const data2 = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Number of Active Users in this Week",
        data: [52, 20, 12, 26, 18, 68, 88],
        backgroundColor: "Blue",
        borderColor: "black",
        pointBorderColor: "Blue",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 12,
      },
    },
  };

  const options2 = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <>
      <div className="admin-view">
        <h2>Dashboard</h2>
        <div className="list">
          <div className="row">
            <div className="col">
              <h3 className="text-uppercase">Dashboard Data</h3>
            </div>
            <hr />
          </div>
          <div className="container">
            <div className="row">
              <div className="col dashboard-box">
                <h3>Total Futsal</h3>
                {futsal.data.length}
              </div>
              <div className="col dashboard-box">
                <h3>Total Users</h3>
                {user.data.length}
              </div>
              <div className="col dashboard-box">
                <h3>Total Reserve</h3>
                {fetchData.data.length}
              </div>
              <div className="col dashboard-box">
                <h3>Total Messages</h3>
                {message.data.length}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "17px",
            }}
          >
            <div style={{ width: "48%", height: "300px" }}>
              <Line data={data} options={options}></Line>
            </div>
            <div style={{ width: "48%", height: "300px" }}>
              <Line data={data2} options={options2}></Line>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
