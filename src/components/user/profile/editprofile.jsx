import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../navBar/navBar";
import TextField from "@mui/material/TextField";
import useAuth from "../../admin/customHooks/userAuth";

const EditProfile = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [userData, setUserData] = useState({
    userName: "",
    userLname: "",
    email: "",
    contact: "",
    address: "",
  });

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
            setUserData({
              userName: data.data.userName,
              userLname: data.data.userLname,
              email: data.data.email,
              contact: data.data.contact,
              address: data.data.address,
            });
          } else {
            alert("Error fetching user data. Please try again later.");
          }
        })
        .catch((error) => {
          alert("Error fetching user data. Please try again later.");
        });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value === null ? "" : value.toString(),
    }));
  };

  const handleSubmit = () => {
    const updatedData = {
      user_id: auth.user_id,
      userName: userData.userName,
      userLname: userData.userLname,
      email: userData.email,
      contact: userData.contact,
      address: userData.address,
    };

    fetch(`http://localhost:8080/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === true) {
          Swal.fire("Success!", "Profile updated successfully", "success").then(
            () => {
              navigate("/profile");
            }
          );
        } else {
          Swal.fire(
            "Error!",
            "Error updating profile. Please try again later.",
            "error"
          );
        }
      })
      .catch((error) => {
        Swal.fire(
          "Error!",
          "Error updating profile. Please try again later.",
          "error"
        );
      });
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#fcfcfc", padding: "4rem" }}>
        <div className="card container rounded bg-white">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="User Avatar"
                />
                <br />
                <span className="font-weight-bold">
                  {userData.userName} {userData.userLname}
                </span>
                <span className="text-black-50">{userData.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="text-right">Profile Settings</h3>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <TextField
                      id="userName"
                      name="userName"
                      label="First Name"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={userData.userName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="userLname"
                      name="userLname"
                      label="Last Name"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={userData.userLname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={userData.email}
                      disabled
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <TextField
                      id="contact"
                      name="contact"
                      label="Phone Number"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={userData.contact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <TextField
                      id="address"
                      name="address"
                      label="Address"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={userData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3 text-center">
                  <button
                    className="btn btn-lg btn-primary w-100"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
