import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../navBar/navBar";
import useAuth from "../../admin/customHooks/userAuth";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import useFetch from "../../admin/customHooks/useFetch";

const Profile = () => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reserveApi = "http://localhost:8080/reserve";
  const { fetchData, setFetchData, fetchDatafunc, fetchError } =
    useFetch(reserveApi);

  useEffect(() => {
    if (auth && auth.token) {
      fetch(`http://localhost:8080/user/id/${auth.user_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === true) {
            setUserData(data.data);
          } else {
            setError("Error fetching user data. Please try again later.");
          }
        })
        .catch((error) => {
          setError("Error fetching user data. Please try again later.");
        });
    }
  }, [auth]);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      const updatedData = fetchData.data.map((item) => {
        const currentDate = new Date().toISOString().split("T")[0];
        const bookingDate = item.booking_date;

        let booking_status;
        if (currentDate > bookingDate) {
          booking_status = "Played";
        } else {
          booking_status = "Booked";
        }
        return { ...item, booking_status };
      });
      if (JSON.stringify(updatedData) !== JSON.stringify(fetchData.data)) {
        setFetchData((prevData) => ({ ...prevData, data: updatedData }));
      }
    }
  }, [fetchData.data]);

  const handleFutsalButtonClick = () => {
    if (userData?.futsal?.futsal_id) {
      // If there is a futsal_id in userData, navigate to myfutsal page with futsal_id as a route parameter
      navigate(`/myfutsal/${userData.futsal.futsal_id}`);
    } else {
      // If there is no futsal_id in userData, navigate to createfutsal.jsx
      navigate("/createfutsal");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2>Personal Details</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          userData && (
            <div className="main-body mt-3">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center m-3">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Admin"
                          className="rounded-circle"
                          width="150"
                        ></img>
                        <div className="mt-3">
                          <h4>
                            {userData?.userName} {userData?.userLname}
                          </h4>
                          <p className="text-muted font-size-sm">
                            Joined in{" "}
                            {userData?.joinDate
                              ? `${userData.joinDate[0]}-${userData.joinDate[1]}-${userData.joinDate[2]}`
                              : "N/A"}
                          </p>
                          <div className="d-flex justify-content align-items-center mt-4 px-4">
                            <div className="stats">
                              <h6 className="mb-1">Match Played</h6>
                              <span>8,797</span>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="stats">
                              <h6 className="mb-1">Futsal Visited</h6>
                              <span>142</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">First Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userData?.userName}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Last Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userData?.userLname}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userData?.email}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userData?.contact}
                        </div>
                      </div>
                      <hr></hr>

                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userData?.address}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-sm-12">
                          <a
                            href="/editprofile"
                            className="btn btn-primary edit-profile"
                          >
                            <i className="fa fa-pencil-square fa-lg"></i> Edit
                            profile
                          </a>
                          &nbsp;&nbsp;
                          {userData?.role === "Owner" && (
                            <button
                              className="btn btn-primary edit-profile"
                              onClick={handleFutsalButtonClick}
                            >
                              <i className="far fa-futbol"></i> Futsal
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h4>History</h4>
                      <table
                        id="dataTable"
                        className="table table-responsive table-width admin-table"
                        style={{ fontSize: "13.5px" }}
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Futsal Name</th>
                            <th>Futsal Address</th>
                            <th>Contact</th>
                            <th>Price</th>
                            <th>Match Time</th>
                            <th>Match Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetchData.data
                            .filter(
                              (item) => userData?.email === item.users?.email
                            )
                            .map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.futsal?.futsalName}</td>
                                <td>{item.futsal?.futsal_location}</td>
                                <td>{item.futsal?.futsal_contact}</td>
                                <td>{item.futsal?.futsal_price}</td>
                                <td>{item.booking_date}</td>
                                <td>
                                  {item.booking_start_time}-
                                  {item.booking_end_time}
                                </td>
                                <td>
                                  <button
                                    className={`button btn  ${
                                      item.booking_status === "Played"
                                        ? "btn-outline-success"
                                        : "btn-outline-danger"
                                    }`}
                                    disabled
                                  >
                                    {item.booking_status}
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
