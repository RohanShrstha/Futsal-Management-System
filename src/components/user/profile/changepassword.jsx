import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2"; // Import SweetAlert2
import NavBar from "../navBar/navBar";
import TextField from "@mui/material/TextField";

const ChangePassword = () => {
  const sessionUser = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire("Error!", "Passwords do not match.", "error");
      return;
    }

    // Create a new object with only the fields you want to update
    const updatedData = {
      user_id: sessionUser.user_id,
      password: password,
    };

    // Make a POST request to change the password
    fetch(`http://localhost:8080/user/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionUser.token}`,
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
          // Password changed successfully
          Swal.fire(
            "Success!",
            "Password changed successfully",
            "success"
          ).then(() => {
            // Redirect to the profile page
            navigate("/profile"); // Use navigate to go to the profile page
          });
        } else {
          Swal.fire(
            "Error!",
            "Error changing password. Please try again later.",
            "error"
          );
        }
      })
      .catch((error) => {
        Swal.fire(
          "Error!",
          "Error changing password. Please try again later.",
          "error"
        );
      });
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#fcfcfc", padding: "7rem" }}>
        <div className="card container rounded bg-white w-50">
          <div className="row">
            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center pt-3">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Profile Avatar"
                />
                <br />
                <span className="font-weight-bold">
                  {sessionUser?.userName} {sessionUser?.userLname}
                </span>
                <span className="text-black-50">{sessionUser?.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="text-right">Change Password</h3>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <TextField
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <TextField
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3 text-center">
                  <button
                    className="btn btn-lg btn-primary w-100"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Change Password
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

export default ChangePassword;
