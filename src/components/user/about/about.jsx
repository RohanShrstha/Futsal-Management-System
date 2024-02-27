import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import About from "../../../assets/About.jpg";
import About1 from "../../../assets/about1.jpg";

function about() {
  return (
    <>
      <NavBar />
      <img src={About} alt="About" className="w-100" />
      <div className="container-fluid d-flex align-items-center justify-content-center pt-5 pb-5">
        <div className="text-center">
          <h1 className="display-4">About Us</h1>
        </div>
      </div>

      <div className="mb-5">
        <div className="container">
          <div className="row">
            <section className="col-8">
              <p
                className="fs-5"
                style={{
                  textAlign: "justify",
                  lineHeight: "32px",
                  paddingRight: "6px",
                }}
              >
                Futsal Management System is a web application which provides a
                platform for connecting futsal business owners and customers,
                all within the Kathmandu area, allowing for easy online booking.{" "}
                <br />
                The objective is to simplify the process of reserving futsal
                courts for both customers and business owners. Futsal business
                owners can easily list and manage their services, while
                customers can browse and book futsal courts quickly and
                conveniently, replacing the traditional in-person booking
                process. <br /> We understand that finding a futsal court can be
                a time-consuming and frustrating experience. Our web application
                not only simplifies the booking process but also provides
                navigation assistance, making it easier than ever to find the
                perfect futsal court. <br />
                Join us in bringing the active futsal community in the Kathmandu
                region together, enhancing convenience, accessibility, and the
                joy of the game. We're committed to making futsal more enjoyable
                and accessible for everyone involved.
              </p>
            </section>
            <div className="col-4">
              <img
                src={About1}
                className="w-100"
                alt="Photo Here"
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default about;
