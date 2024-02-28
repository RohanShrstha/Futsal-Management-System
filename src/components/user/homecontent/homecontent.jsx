import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../admin/customHooks/userAuth";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import coverfutsal from "../../../assets/futsal-court.jpg";
import home1 from "../../../assets/home1.jpg";
import home2 from "../../../assets/home2.jpg";
import home3 from "../../../assets/home3.jpg";
import home4 from "../../../assets/home4.jpg";
import home5 from "../../../assets/home5.jpg";
import home6 from "../../../assets/home6.jpg";

function HomeContent() {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
      <img src={coverfutsal} className="w-100" alt="Futsal Court"></img>
      <div
        className=""
        style={{
          position: "absolute",
          left: "20rem",
          top: "24rem",
        }}
      >
        {userData?.role === "Owner" && (
          <button
            className="btn100"
            type="button"
            onClick={handleFutsalButtonClick}
          >
            <strong>Go to My Futsal</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        )}
      </div>
      <div className="text-center d-flex justify-content-center mt-5 mb-2 description">
        <section className="col-8">
          <h1 className="fs-1">Welcome to Futsal Booking Site</h1>
          <p className="lead text-muted text-center fs-5">
            Futsal is a variant of soccer that is played indoors on a smaller
            field with a reduced number of players per team. This web
            application provides varieties of futsals located inside the
            Kathmandu area, which can be booked online.
            <br /> This is an online booking webpage that makes it simple for
            customers to reserve the futsal they want for the time that works
            best for them. Futsal business owners can easily list and manage all
            of their varied services here.
          </p>
        </section>
      </div>
      <div className="container px-4 mt-5 py-3" id="featured-3">
        <h1 className="pb-2 border-bottom text-center">What We Have</h1>
        <div className="row py-3">
          <div className="feature col">
            <div className="bg-primary-light card box-shadow p-3">
              <h4>Numerous Futsals</h4>
              <img
                src={home1}
                className="w-100 pb-2"
                alt="Numerous Futsals"
              ></img>
              <p>
                In this site, there are many futsals that you can book anytime.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="bg-light card mb-4 box-shadow p-3">
              <h4>Book Your Futsal</h4>
              <img
                src={home2}
                className="w-100 pb-2"
                alt="Book Your Futsal"
              ></img>
              <p>
                You can book any futsal at any time according to your needs.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="bg-light card mb-4 box-shadow p-3">
              <h4>Simple to Pay</h4>
              <img src={home4} className="w-100 pb-2" alt="Simple to Pay"></img>
              <p>
                The transaction process is easy as we provide many payment
                methods.
              </p>
            </div>
          </div>
          <div className="feature col">
            <div className="bg-light card mb-4 box-shadow p-3">
              <h4>Easy Booking</h4>
              <img src={home3} className="w-100 pb-2" alt="Easy Booking"></img>
              <p>
                Booking is so easy, just choose the futsal you want and reserve
                it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 mb-5">
        <div className="container">
          <div className="row">
            <h1
              className="text-center mb-4"
              style={{ textDecoration: "underline" }}
            >
              About Us
            </h1>
            <div className="col-2"></div>
            <section className="col-5">
              <p className="text-muted fs-4 " style={{ textAlign: "justify" }}>
                This site is an online booking tool created to make it simple
                for customers to reserve the futsal they want for the time that
                works best for them. Futsal business owners can easily list and
                manage all of their varied services here. Customers who are
                interested in booking futsal can browse all of the alternatives
                and book the futsal easily in a short period of time.
              </p>
            </section>
            <div className="col-3">
              <img
                src={home6}
                className="w-100"
                alt="About Us Photo"
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>

      <div className="container mb-5" style={{ marginTop: "6%" }}>
        <img
          src={home5}
          className="w-100 home-photo"
          alt="Home Photo"
          style={{ borderRadius: "20px" }}
        />
      </div>
    </>
  );
}

export default HomeContent;
