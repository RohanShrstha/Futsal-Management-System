import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../navBar/navBar";
import TextField from "@mui/material/TextField";
import photo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../admin/customHooks/userAuth";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const createfutsal = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const sessionUser = JSON.parse(localStorage.getItem("auth"));

  const [futsalData, setFutsalData] = useState({
    user_id: auth?.user_id,
    futsal_name: "",
    futsal_email: "",
    futsal_price: "",
    futsal_wprice: "",
    futsal_location: "",
    futsal_contact: "",
    futsal_openingTime: "",
    futsal_closingTime: "",
    futsal_description: "",
    futsal_features: "",
    futsal_latitude: "",
    futsal_longitude: "",
    futsal_status: "Available",
    photos: [],
  });

  const [images, setImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([27.70076, 85.30014]);
  const [userLatitude, setUserLatitude] = useState(27.70076); // default value
  const [userLongitude, setUserLongitude] = useState(85.30014); // default value

  const updateMarkerPosition = (latlng) => {
    const [lat, lon] = [latlng.lat, latlng.lng];

    // Check if the marked location is within Kathmandu bounds
    if (
      lat >= KATHMANDU_LATITUDE_BOUNDS.min &&
      lat <= KATHMANDU_LATITUDE_BOUNDS.max &&
      lon >= KATHMANDU_LONGITUDE_BOUNDS.min &&
      lon <= KATHMANDU_LONGITUDE_BOUNDS.max
    ) {
      setMarkerPosition([lat, lon]);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        text: "Mark the location inside Kathmandu City Only",
        confirmButtonText: "Okay",
        timer: 5000,
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };

  const handleMarkerDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);

    // Update the latitude and longitude in the futsalData state
    setFutsalData({
      ...futsalData,
      futsal_latitude: lat,
      futsal_longitude: lng,
    });
  };

  const [errors, setErrors] = useState({
    futsal_name: "",
    futsal_email: "",
    futsal_price: "",
    futsal_wprice: "",
    futsal_location: "",
    futsal_contact: "",
    futsal_openingTime: "",
    futsal_closingTime: "",
    futsal_description: "",
    futsal_features: "",
    futsal_latitude: "",
    futsal_longitude: "",
  });

  const [iframeSrc, setIframeSrc] = useState("");

  // const handleImageChange = (event) => {
  //   const selectedImages = Array.from(event.target.files);
  //   setImages(selectedImages);
  // };

  const handleImageChange = (event) => {
    setPhotos(event.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFutsalData({
      ...futsalData,
      [name]: value,
    });
    // Check if it's the file input and has files selected
    // if (name === "photos[]") {
    //   const selectedFiles = Array.from(e.target.files);

    //   // Update the state with the selected files
    //   setFutsalData({
    //     ...futsalData,
    //     [name]: selectedFiles,
    //   });
    // } else {
    //   // Handle other input fields (if any)
    //   const { value } = e.target;
    //   setFutsalData({
    //     ...futsalData,
    //     [name]: value,
    //   });
    // }

    if (name === "futsal_name" && value.length === 0) {
      setErrors({ ...errors, futsal_name: "Futsal Name is required" });
    } else if (name === "futsal_email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors({ ...errors, futsal_email: "Invalid Email Address" });
    } else if (name === "futsal_price" && isNaN(value)) {
      setErrors({ ...errors, futsal_price: "Price must be a number" });
    } else if (name === "futsal_wprice" && isNaN(value)) {
      setErrors({ ...errors, futsal_wprice: "Weekend Price must be a number" });
    } else if (name === "futsal_location" && value.trim() === "") {
      setErrors({ ...errors, futsal_location: "Futsal location is required" });
    } else if (name === "futsal_contact" && value.trim() === "") {
      setErrors({ ...errors, futsal_contact: "Futsal Contact is required" });
    } else if (name === "futsal_openingTime" && isNaN(value)) {
      setErrors({
        ...errors,
        futsal_openingTime: "Opening Time must be a number",
      });
    } else if (name === "futsal_closingTime" && isNaN(value)) {
      setErrors({
        ...errors,
        futsal_closingTime: "Closing time must be a number",
      });
    } else if (name === "futsal_description" && value.trim() === "") {
      setErrors({
        ...errors,
        futsal_description: "Futsal description is required",
      });
    } else if (name === "futsal_features" && value.trim() === "") {
      setErrors({ ...errors, futsal_features: "Futsal features is required" });
    } else if (name === "futsal_latitude" && value.trim() === "") {
      setErrors({ ...errors, futsal_latitude: "Futsal latitude is required" });
    } else if (name === "futsal_longitude" && value.trim() === "") {
      setErrors({
        ...errors,
        futsal_longitude: "Futsal longitude is required",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSave = async () => {
    const requiredFields = [
      "futsal_name",
      "futsal_email",
      "futsal_price",
      "futsal_wprice",
      "futsal_location",
      "futsal_contact",
      "futsal_openingTime",
      "futsal_closingTime",
      "futsal_description",
      "futsal_features",
      "futsal_latitude",
      "futsal_longitude",
    ];

    const hasEmptyFields = requiredFields.some(
      (fieldName) => !futsalData[fieldName]
    );

    if (hasEmptyFields) {
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    // const formData = new FormData();
    // formData.append("data", futsalData);
    // images.forEach((image, index) => {
    //   formData.append(`photos${index}`, image);
    // });

    const formData = new FormData();
    formData.append("data", JSON.stringify(futsalData));
    // for (let i = 0; i < photos.length; i++) {
    //   formData.append("photos", photos[i]);
    // }

    // for (const key in futsalData) {
    //   if (key === "photos") {
    //     if (futsalData.photos.length != 0 && futsalData.photos[0] != null) {
    //       console.log("adding multipart file");
    //       for (let i = 0; i < futsalData.photos.length; i++) {
    //         formData.append("photos", futsalData.photos[i]);
    //       }
    //     } else {
    //       console.log("no files");
    //     }
    //   } else {
    //     formData.append(key, futsalData[key]);
    //   }
    // }

    console.log("formdata");
    for (const entry of formData.entries()) {
      console.log(entry[0], JSON.stringify(entry[1]));
    }

    try {
      if (auth && auth.token) {
        // const response = await fetch("http://localhost:8080/futsal", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${auth.token}`,
        //   },
        //   body: formData,
        // });
        // const response = await fetch("http://localhost:8080/futsal", {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${auth.token}`,
        //   },
        //   body: formData,
        // });

        const response = await axios.post(
          "http://localhost:8080/futsal",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        console.log(response);

        if (response?.status == "200") {
          // const data = await response.json();
          // const futsalId = data.futsal_id;
          Swal.fire({
            icon: "success",
            title: "Futsal created successfully!",
            text: "Your futsal has been created.",
          }).then(() => {
            // Navigate to the profile page
            navigate("/profile");
          });

          // const updateUserResponse = await fetch(
          //   `http://localhost:8080/user/updateFutsalId/${auth.user_id}`,
          //   {
          //     method: "PUT",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${auth.token}`,
          //     },
          //     body: JSON.stringify({ futsal_id: futsalId }),
          //   }
          // );
          // if (updateUserResponse.ok) {
          //   console.log("User's futsal_id updated.");
          // } else {
          //   console.error("Failed to update user's futsal_id");
          // }
          // navigate("/profile");
        } else {
          console.error("Failed to create futsal");
        }
      } else {
        console.error("Authentication token missing");
      }
    } catch (error) {
      console.error("Error creating futsal", error);
    }
  };

  useEffect(() => {
    if (futsalData.futsal_latitude && futsalData.futsal_longitude) {
      const latitude = futsalData.futsal_latitude;
      const longitude = futsalData.futsal_longitude;

      setIframeSrc(
        `https://maps.google.com/maps?q=${latitude},${longitude}&hl=e;&output=embed`
      );
    }
  }, [futsalData.futsal_latitude, futsalData.futsal_longitude]);

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
                  alt="Futsal"
                ></img>
                <br />
                <span className="font-weight-bold">Fill up the form to</span>
                <span className="text-black-50">Create your futsal here</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-7 border-right">
              <form method="POST" encType="multipart/form-data">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-right">Create your Futsal</h3>
                  </div>

                  <div className="col-md-12 mt-2">
                    <TextField
                      id="name"
                      name="futsal_name"
                      label="Futsal Name"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    {errors.futsal_name && (
                      <p className="error-message">{errors.futsal_name}</p>
                    )}
                  </div>

                  <div className="col-md-12 mt-3">
                    <TextField
                      id="email"
                      name="futsal_email"
                      label="E-mail"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    {errors.futsal_email && (
                      <p className="error-message">{errors.futsal_email}</p>
                    )}
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <TextField
                        id="nprive"
                        name="futsal_price"
                        label="Normal Price (Rs)"
                        variant="outlined"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                      {errors.futsal_price && (
                        <p className="error-message">{errors.futsal_price}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="wprice"
                        name="futsal_wprice"
                        label="Weekend Price (Rs)"
                        variant="outlined"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                      {errors.futsal_wprice && (
                        <p className="error-message">{errors.futsal_wprice}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <TextField
                      id="address"
                      name="futsal_location"
                      label="Address"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    {errors.futsal_location && (
                      <p className="error-message">{errors.futsal_location}</p>
                    )}
                  </div>

                  <div className="col-md-12 mt-3">
                    <TextField
                      id="contact"
                      name="futsal_contact"
                      label="Contact No."
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    {errors.futsal_contact && (
                      <p className="error-message">{errors.futsal_contact}</p>
                    )}
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <TextField
                        id="open"
                        name="futsal_openingTime"
                        label="Opening Time (Eg: 6)"
                        variant="outlined"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                      {errors.futsal_openingTime && (
                        <p className="error-message">
                          {errors.futsal_openingTime}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="close"
                        name="futsal_closingTime"
                        label="Closing Time (Eg: 20)"
                        variant="outlined"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                      {errors.futsal_closingTime && (
                        <p className="error-message">
                          {errors.futsal_closingTime}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <TextField
                      id="description"
                      name="futsal_description"
                      label="Description"
                      variant="outlined"
                      className="form-control form-control-lg"
                      onChange={handleChange}
                    />
                    {errors.futsal_description && (
                      <p className="error-message">
                        {errors.futsal_description}
                      </p>
                    )}
                  </div>
                  <div className="col-md-12 mt-3">
                    <TextField
                      id="features"
                      name="futsal_features"
                      label="Features"
                      variant="outlined"
                      className="form-control form-control-lg"
                      height="20px"
                      onChange={handleChange}
                    />
                    {errors.futsal_features && (
                      <p className="error-message">{errors.futsal_features}</p>
                    )}
                  </div>
                  {/* <div className="col-md-12 mt-3">
                    <input
                      type="file"
                      id="photoInput"
                      name="photos[]"
                      multiple="multiple"
                      className="form-control form-control-lg"
                      onChange={handleImageChange}
                    />
                  </div> */}

                  {/* <div className="col-md-12 mt-3">
                    <label htmlFor="">Scan Photo</label>
                    <input
                      type="file"
                      id="photoInput"
                      name="photos[]"
                      multiple="multiple"
                      className="form-control form-control-lg"
                      // onChange={handleImage}
                    />
                  </div> */}

                  <MapContainer
                    center={markerPosition}
                    zoom={14}
                    style={{
                      height: "300px",
                      width: "100%",
                      margin: "20px 0 0",
                    }}
                    whenCreated={setMap}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={markerPosition}
                      draggable={true}
                      eventHandlers={{
                        dragend: handleMarkerDragEnd,
                      }}
                    />
                  </MapContainer>

                  <div className="row mt-3 mb-3">
                    <div className="col-md-6">
                      <TextField
                        id="latitude"
                        name="futsal_latitude"
                        label="Latitude"
                        variant="outlined"
                        className="form-control form-control-lg"
                        value={markerPosition[1].toFixed(6)}
                        onChange={handleChange}
                      />
                      {errors.futsal_latitude && (
                        <p className="error-message">
                          {errors.futsal_latitude}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="longitude"
                        name="futsal_longitude"
                        label="Longitude"
                        variant="outlined"
                        className="form-control form-control-lg"
                        value={markerPosition[0].toFixed(6)}
                        onChange={handleChange}
                      />
                      {errors.futsal_longitude && (
                        <p className="error-message">
                          {errors.futsal_longitude}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 mt-3 text-center">
                    <button
                      className="btn btn-lg btn-primary w-100"
                      type="button"
                      onClick={handleSave}
                    >
                      Save Futsal Information
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createfutsal;
