import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../navBar/navBar";
import { useParams } from "react-router-dom";
import useFetch from "../../admin/customHooks/useFetch";
import photo1 from "../../../assets/f1.jpg";
import photo2 from "../../../assets/f2.jpg";
import photo3 from "../../../assets/f3.jpg";
import Footer from "../footer/footer";
import Swal from "sweetalert2";

const myfutsal = () => {
  const { futsal_id } = useParams();
  const urlApi = `http://localhost:8080/futsal/id/${futsal_id}`;
  const sessionUser = JSON.parse(localStorage.getItem("auth"));
  const { fetchData, fetchError } = useFetch(urlApi);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [initTimeSlots, setInitTimeSlots] = useState([]);
  const [time, setTime] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/reserve")
      .then((response) => response.json())
      .then((data) => {
        setReservationData(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        setIsFetchLoading(false);
      })
      .catch((error) => {
        setIsFetchLoading(false);
      });
  }, [urlApi]);

  useEffect(() => {
    if (fetchData.data) {
      const startTime = parseInt(fetchData.data.futsal_openingTime);
      const endTime = parseInt(fetchData.data.futsal_closingTime);
      const initialTimeSlots = [];

      for (let hour = startTime; hour < endTime; hour++) {
        const formattedHour = formatHour(hour);
        const nextHour = formatHour(hour + 1);
        const timeSlot = `${formattedHour} - ${nextHour}`;
        initialTimeSlots.push(timeSlot);
      }
      setInitTimeSlots(initialTimeSlots);
      setTimeSlots(initialTimeSlots);
    }
  }, [fetchData.data]);

  const [selectedDate, setSelectedDate] = useState("");
  const handleChange = (event) => {
    setTimeSlots(initTimeSlots);
    const newSelectedDate = event.target.value;
    setSelectedDate(newSelectedDate);
    fetch(
      `http://localhost:8080/reserve/futsal/id/${futsal_id}/date/${newSelectedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTime(data);
        setIsFetchLoading(false);
      })
      .catch((error) => {
        setIsFetchLoading(false);
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    if (time?.data?.length > 0) {
      const disabledTimeSlots = generateDisabledTimeSlots();
      const availableTimeSlots = timeSlots.filter(
        (item) => !disabledTimeSlots.includes(item)
      );
      setTimeSlots(availableTimeSlots);
    }
  }, [time]);

  const generateDisabledTimeSlots = () => {
    const disabledTimeSlots = [];

    time.data.forEach((item) => {
      if (item.booking_date === selectedDate) {
        const timeSlot = handleGenerateDashTime(
          item.booking_start_time,
          item.booking_end_time
        );
        disabledTimeSlots.push(timeSlot);
      }
    });

    return disabledTimeSlots;
  };

  const handleGenerateDashTime = (bookingStartTime, bookingEndTime) => {
    const startTime = parseInt(bookingStartTime);
    const endTime = parseInt(bookingEndTime);

    function formatTime(time) {
      return `${time}PM`;
    }

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    const bookingTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

    return bookingTimeRange;
  };

  const formatHour = (hour) => {
    if (hour >= 12) {
      return `${hour === 12 ? 12 : hour - 12}PM`;
    } else {
      return `${hour === 0 ? 12 : hour}AM`;
    }
  };

  const handleBookingTimeChange = (event) => {
    const selectedTimeSlot = event.target.value;
    setSelectedTimeSlot(selectedTimeSlot);
  };

  const handleReserve = () => {
    const selectedTime = selectedTimeSlot;
    const timeParts = selectedTime.split(" - ");
    const booking_start_time = timeParts[0].replace(/[^\d]/g, "");
    const booking_end_time = timeParts[1].replace(/[^\d]/g, "");

    fetch("http://localhost:8080/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        futsal_id: fetchData.data.futsal_id,
        users_id: sessionUser?.user_id,
        booking_date: selectedDate,
        booking_end_time: booking_end_time,
        booking_start_time: booking_start_time,
        booking_status: "AVAILABLE",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Reservation Successful",
          text: "Your reservation has been made successfully!",
        });

        setSelectedDate("");
        setSelectedTimeSlot("");
      })
      .catch((error) => {
        console.error("Reservation error:", error);
        Swal.fire({
          icon: "error",
          title: "Reservation Failed",
          text: "An error occurred while making the reservation.",
        });
      });
  };

  if (isFetchLoading) {
    return (
      <>
        <div className="box">
          <div className="shadow"></div>
          <div className="gravity">
            <div className="ball"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar />
      {fetchData.data ? (
        <div className="container py-4">
          <h1
            className="text-center pb-3"
            style={{ fontFamily: "Cursive", fontSize: "50px" }}
          >
            My Futsal
          </h1>
          <div className="row align-items-md-stretch mb-4">
            <div className="col-md-6">
              <div className="bg-body-tertiary border rounded-3">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div
                    className="carousel-inner"
                    style={{
                      height: "30vw",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="carousel-item active">
                      <img src={photo1} className="w-100 " alt="Futsal" />
                    </div>
                    <div className="carousel-item">
                      <img src={photo2} className="w-100" alt="Futsal" />
                    </div>
                    <div className="carousel-item">
                      <img src={photo3} className="w-100" alt="Futsal" />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="bg-body-tertiary card border rounded-3"
                style={{ padding: "1rem 2rem", lineHeight: "24px" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h2 className="pb-2">{fetchData.data.futsal_name}</h2>
                  <a
                    href="/editfutsal"
                    className="btn button btn-primary"
                    style={{ height: "36px" }}
                  >
                    <i className="fa fa-pencil-square fa-lg"></i> Edit Futsal
                  </a>
                </div>

                <p>
                  <b>Description: </b>
                  {fetchData.data.futsal_description}
                </p>
                <p>
                  <b>Address: </b>
                  {fetchData.data.futsal_location}
                </p>
                <p>
                  <b>Contact No. : </b>
                  {fetchData.data.futsal_contact}
                </p>
                <p>
                  <b>Email: </b>
                  {fetchData.data.futsal_email}
                </p>
                <p>
                  <b>Open/Close Hour: </b>
                  {fetchData.data.futsal_openingTime}AM -&nbsp;
                  {parseInt(fetchData.data.futsal_closingTime) > 12
                    ? parseInt(fetchData.data.futsal_closingTime) - 12
                    : parseInt(fetchData.data.futsal_closingTime)}
                  PM
                </p>
                <p>
                  <b>Normal Price: </b>Rs {fetchData.data.futsal_price}
                </p>
                <p>
                  <b>Weekend Price(Saturday): </b>Rs{" "}
                  {fetchData.data.futsal_wprice}
                </p>
                <div>
                  <b>Features: </b>
                  <br />
                  {fetchData.data.futsal_features}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="rounded-3 card col-7">
              <div className="p-4">
                <h1 className="text-center p-2 mb-4 ">Book your Futsal Now</h1>
                <div>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-12">
                        <form className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="selectedDate">Select Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="selectedDate"
                              value={selectedDate}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="bookingTime">
                              Select Time Slot
                            </label>
                            <select
                              className="form-control"
                              id="bookingTime"
                              onChange={handleBookingTimeChange}
                            >
                              {timeSlots.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12 d-flex justify-content-center mt-3">
                            <button
                              className="btn-book m-3"
                              type="button"
                              onClick={handleReserve}
                            >
                              <span className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="currentColor"
                                  viewBox="2 0 24 24"
                                >
                                  {" "}
                                  <g>
                                    {" "}
                                    <path fill="none" d="M0 0h24v24H0z" />{" "}
                                    <path
                                      fillRule="nonzero"
                                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1.67 14h-3.34l-1.38 1.897.554 1.706A7.993 7.993 0 0 0 12 20c.871 0 1.71-.14 2.496-.397l.553-1.706L13.669 16zm-8.376-5.128l-1.292.937L4 12c0 1.73.549 3.331 1.482 4.64h1.91l1.323-1.82-1.028-3.17-2.393-.778zm13.412 0l-2.393.778-1.028 3.17 1.322 1.82h1.91A7.964 7.964 0 0 0 20 12l-.003-.19-1.291-.938zM12 9.536l-2.344 1.702.896 2.762h2.895l.896-2.762L12 9.536zm2.291-5.203L13 5.273V7.79l2.694 1.957 2.239-.727.554-1.703a8.014 8.014 0 0 0-4.196-2.984zm-4.583 0a8.014 8.014 0 0 0-4.195 2.985l.554 1.702 2.239.727L11 7.79V5.273l-1.292-.94z"
                                    />{" "}
                                  </g>{" "}
                                </svg>
                              </span>
                              <span className="text">Book Now</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="bg-body-tertiary rounded-3 card h-100">
                <iframe
                  id="iframeId"
                  src={`https://maps.google.com/maps?q=${fetchData.data.futsal_latitude},${fetchData.data.futsal_longitude}&hl=e;&output=embed`}
                  width="100%"
                  height="100%"
                  title="Futsal Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card mb-3 mt-4">
                <div className="card-body  p-4">
                  <h4>History</h4>
                  {console.log(reservationData)}
                  {reservationData === undefined ? (
                    <p>Loading reservation data...</p>
                  ) : Array.isArray(reservationData) &&
                    reservationData.length > 0 ? (
                    <table
                      id="dataTable"
                      className="table table-responsive table-width admin-table"
                      style={{ fontSize: "13.5px" }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>User Name</th>
                          <th>Address</th>
                          <th>Contact</th>
                          <th>Price</th>
                          <th>Match Time</th>
                          <th>Match Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationData.map((reservation, index) => (
                          <tr key={index}>
                            <td>{reservation.booking_id}</td>
                            <td>{reservation.users?.user_name}</td>
                            <td>{reservation.users?.address}</td>
                            <td>{reservation.users?.contact}</td>
                            <td>{reservation.price}</td>
                            <td>{reservation.booking_start_time}</td>
                            <td>{reservation.booking_date}</td>
                            <td>
                              <button className="button btn" disabled>
                                {reservation.booking_status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No reservation data available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isFetchLoading ? (
        <div>Loading...</div>
      ) : (
        <p>Error: {fetchError.message}</p>
      )}
      <Footer />
    </>
  );
};

export default myfutsal;
