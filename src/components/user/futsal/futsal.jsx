import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import coverfutsal from "../../../assets/P3.jpg";
import NavBar from "../navBar/navBar";
import { Link } from "react-router-dom";
import useFetch from "../../admin/customHooks/useFetch";
import photo1 from "../../../assets/f1.jpg";
import Footer from "../footer/footer";
import useAuth from "../../admin/customHooks/userAuth";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import "./futsal.css";

const Futsal = () => {
  const KATHMANDU_LATITUDE_BOUNDS = { min: 27.67844, max: 27.7615 };
  const KATHMANDU_LONGITUDE_BOUNDS = { min: 85.24646, max: 85.37562 };
  const futsalApiUrl = "http://localhost:8080/futsal";
  const userApiUrl = "http://localhost:8080/user";
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const {
    fetchData: futsalData,
    fetchError: futsalError,
    setFetchData: setFutsalData,
    isFetchLoading: isFutsalLoading,
  } = useFetch(futsalApiUrl);
  const { fetchData: userData, fetchError: userError } = useFetch(userApiUrl);
  const { auth } = useAuth();
  const [nearestFutsals, setNearestFutsals] = useState([]);
  const [availableFutsals, setAvailableFutsals] = useState([]);

  const filterFutsalsByStatus = (futsals, status) => {
    return futsals.filter((futsal) => futsal.futsal_status === status);
  };

  useEffect(() => {
    // Filter futsals by status and set available futsals
    const desiredStatus = "Available";
    const filteredFutsals = filterFutsalsByStatus(
      nearestFutsals,
      desiredStatus
    );
    setAvailableFutsals(filteredFutsals);
  }, [nearestFutsals]);

  useEffect(() => {
    if (auth && auth.token) {
      //getting user data
      const userApiUrl = `http://localhost:8080/user/id/${auth.user_id}`;

      fetch(userApiUrl, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error fetching user data:", response.statusText);
            throw new Error("User data fetch failed");
          }
          return response.json();
        })

        .catch((error) => {
          console.error("User data fetch error:", error);
          setIsFetchLoading(false);
        });
    } else {
      setIsFetchLoading(false);
    }
  }, [auth]);

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

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([27.70076, 85.30014]);
  const [userLatitude, setUserLatitude] = useState(27.70076); // default value
  const [userLongitude, setUserLongitude] = useState(85.30014); // default value

  //Haversine Algorithm implementation
  useEffect(() => {
    if (typeof futsalData.data !== "undefined") {
      const futsalsWithDistance = futsalData.data.map((futsal) => {
        if (
          futsal.futsal_latitude === undefined ||
          futsal.futsal_longitude === undefined
        ) {
          console.error("Futsal data is missing latitude or longitude.");
          return futsal;
        }
        const futsalLatitude = parseFloat(
          futsal.futsal_latitude.replace(",", ".")
        );
        const futsalLongitude = parseFloat(
          futsal.futsal_longitude.replace(",", ".")
        );

        const userLatitude = parseFloat(markerPosition[1].toFixed(6));
        const userLongitude = parseFloat(markerPosition[0].toFixed(6));

        setUserLatitude(userLatitude);
        setUserLongitude(userLongitude);

        function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
          const R = 6371;
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
              Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        }

        const distance = calculateHaversineDistance(
          userLongitude,
          userLatitude,
          futsalLatitude,
          futsalLongitude
        );

        return {
          ...futsal,
          distance,
        };
      });

      const sortedFutsals = futsalsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      // Filter futsals by status and set available futsals
      const desiredStatus = "Available";
      const filteredFutsals = filterFutsalsByStatus(
        sortedFutsals,
        desiredStatus
      );
      setAvailableFutsals(filteredFutsals);

      const result = {
        data: filteredFutsals,
      };
      setFutsalData(result);
    }
  }, [markerPosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFetchLoading(false);
    }, 2000);
  }, []);

  if (isFutsalLoading) {
    return (
      <div className="ringcolor">
        <div class="ring">
          Loading
          <div className="ringspin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid" style={{ padding: "0px 20px 0px 0px" }}>
        <div className="row">
          <div className="col-md-8 d-flex align-items-stretch">
            <img src={coverfutsal} className="w-100 h-100" alt="Futsal Cover" />
          </div>
          <iframe
            src="https://giphy.com/embed/WtPbRc8esmL0k0lyOa"
            alt="Futsal Cover"
            style={{
              position: "absolute",
              height: "120px",
              top: "32%",
              paddingLeft: "12%",
            }}
          ></iframe>

          <div className="col-md-4 d-flex align-items-stretch">
            <div
              className="map w-100 text-muted"
              style={{ margin: "0 -1.4rem" }}
            >
              <div
                className="latlon"
                style={{
                  position: "absolute",
                  top: "55.4%",
                  right: 0,
                  padding: "0 20px",
                  backgroundColor: "#F8F9FA",
                  color: "black",
                  zIndex: "5555",
                  fontSize: "14px",
                }}
              >
                Lat : {userLatitude} , Lon : {userLongitude}
              </div>
              <MapContainer
                center={markerPosition}
                zoom={14}
                style={{
                  height: "320px",
                  width: "108.5%",
                }}
                whenCreated={setMap}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={markerPosition}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      updateMarkerPosition(e.target.getLatLng());
                    },
                  }}
                />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid d-flex align-items-center justify-content-center pt-5 py-4">
        <div className="text-center">
          <h1>Futsals Near Me</h1>
        </div>
      </div>

      <div className="album py-1">
        <div className="container">
          <div className="row">
            {isFetchLoading ? (
              "Loading"
            ) : futsalError || userError ? (
              <p>Error: {futsalError || userError}</p>
            ) : futsalData.data.length > 0 ? (
              futsalData.data.slice(0, 6).map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4 box-shadow">
                    <p
                      className="m-0"
                      style={{
                        position: "absolute",
                        right: "0",
                        fontSize: "1.05vw",
                        backgroundColor: "yellow",
                        color: "black",
                        top: "1vw",
                        padding: "0 20px",
                      }}
                    >
                      {item.futsal_name}
                    </p>
                    <img
                      className="card-img-top"
                      src={photo1}
                      alt="Futsal"
                      data-holder-rendered="true"
                    />
                    <div className="card-body">
                      <h4>{item.futsal_name}</h4>
                      <p className="card-text">{item.futsal_description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link
                            to={`/futsalcontent/${item.futsal_id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            View
                          </Link>
                        </div>
                        <small className="text-muted">
                          Rs {item.futsal_price}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No available futsals</p>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid d-flex align-items-center justify-content-center pt-2 py-3">
        <div className="text-center fst-italic fw-lighter ">
          <p>Six nearest futsals according to the marked location</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Futsal;
