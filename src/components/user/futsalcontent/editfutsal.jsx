import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../navBar/navBar";
import TextField from "@mui/material/TextField";
import photo from "../../../assets/logo.png";

const editfutsal = () => {
  const [latitude, setLatitude] = useState(""); // State for latitude
  const [longitude, setLongitude] = useState(""); // State for longitude

  useEffect(() => {
    if (latitude && longitude) {
      // Only update the iframe when both lat and lon have values
      const iframeData = document.getElementById("iframeId");
      iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=e;&output=embed`;
    }
  }, [latitude, longitude]);
  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#fcfcfc", padding: "4rem" }}>
        <div className="card container rounded bg-body-secondary">
          <div className="row">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={photo}
                ></img>
                <br />
                <span className="font-weight-bold">United Futsal</span>
                <span className="text-black-50">
                  unitedfutsal2020@gmail.com
                </span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="text-right">Edit Futsal</h3>
                </div>

                <div className="col-md-12 mt-2">
                  <TextField
                    id="name"
                    name="name"
                    label="Futsal Name"
                    variant="outlined"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <TextField
                      id="nprive"
                      name="nprice"
                      label="Normal Price (Rs)"
                      variant="outlined"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="wprice"
                      name="wprice"
                      label="Weekend Price (Rs)"
                      variant="outlined"
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <TextField
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <TextField
                    id="contact"
                    name="contact"
                    label="Contact No."
                    variant="outlined"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <TextField
                      id="open"
                      name="open"
                      label="Opening Time (Eg: 6)"
                      variant="outlined"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="close"
                      name="close"
                      label="Closing Time (Eg: 20)"
                      variant="outlined"
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <TextField
                    id="features"
                    name="features"
                    label="Features"
                    variant="outlined"
                    className="form-control form-control-lg"
                    height="20px"
                  />
                </div>

                <p className="mt-2">
                  Insert longitude and latitude of your location by using Google
                  Maps &nbsp;
                  <a
                    href="https://www.google.com/maps?q=loc:0,0"
                    target="_blank"
                  >
                    Click Here
                  </a>
                </p>
                <div className="row mt-3 mb-3">
                  <div className="col-md-6">
                    <TextField
                      id="latitude"
                      name="latitude"
                      label="Latitude"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="longitude"
                      name="longitude"
                      label="Longitude"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                </div>
                {latitude && longitude && (
                  <div className="col-md-12 mt-3">
                    <iframe id="iframeId" width="100%" height="200px"></iframe>
                  </div>
                )}

                <div className="col-md-12 mt-3 text-center">
                  <button
                    className="btn btn-lg btn-primary w-100"
                    type="button"
                  >
                    Save Futsal Information
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

export default editfutsal;
