import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import coverfutsal from "../../../assets/P2.jpg";
import NavBar from "../navBar/navBar";
import { IoLocationSharp, IoCallSharp, IoMail } from "react-icons/io5";
import useCreate from "../../admin/customHooks/useCreate";
import Footer from "../footer/footer";

function Contact() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { isCreateLoading, createData, createError, handleCreate } = useCreate(
    "http://localhost:8080/message"
  );
  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertType("");
      setAlertMessage("");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      messageName: e.target.messageName.value,
      messageEmail: e.target.messageEmail.value,
      messageSubject: e.target.messageSubject.value,
      messageDescription: e.target.messageDescription.value,
    };
    handleCreate(formData);
    showAlert("success", "Message sent Successfully!");
    e.target.reset();
  };

  return (
    <>
      <NavBar />
      <img src={coverfutsal} className="w-100" alt="Cover" />
      <div className="container-fluid d-flex align-items-center justify-content-center pt-5 pb-5">
        <div className="text-center">
          <h1 className="display-4">Contact Us</h1>
        </div>
      </div>

      <div className="justify-content-center ">
        <div className="site-section ">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-5 mb-5 fs-6">
                {alertMessage && (
                  <div
                    className={`alert alert-${alertType} text-center`}
                    role="alert"
                  >
                    {alertMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="contact-form ">
                  <div className="row form-group mb-2">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <input
                        type="text"
                        id="messageName"
                        name="messageName"
                        className="form-control fs-5"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group  mb-2">
                    <div className="col-md-12">
                      <input
                        type="messageEmail"
                        id="messageEmail"
                        name="messageEmail"
                        className="form-control  fs-5"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="row form-group  mb-2">
                    <div className="col-md-12">
                      <input
                        type="text"
                        id="messageSubject"
                        name="messageSubject"
                        className="form-control  fs-5"
                        placeholder="Enter Subject"
                        required
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12">
                      <textarea
                        name="messageDescription"
                        id="messageDescription"
                        cols="30"
                        rows="5"
                        className="form-control  fs-5"
                        placeholder="Say hello to us"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12 mt-2">
                      <input
                        type="submit"
                        value="Send Message"
                        className="btn btn-primary py-2 px-4 w-100"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-lg-4 fs-5">
                <div className="p-2 ml-4 bg-white">
                  <h1 className="h5 text-black mb-3 fs-3">Contact Info</h1>
                  <div className="d-flex align-items-center mb-2">
                    <IoLocationSharp
                      style={{ fontSize: "3rem", marginRight: "1rem" }}
                    />
                    <div>
                      <p className="mb-0 font-weight-bold text-black">
                        Address
                      </p>
                      <p className="mb-4 text-black">
                        Swoyambhu, Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <IoCallSharp
                      style={{ fontSize: "3rem", marginRight: "1rem" }}
                    />
                    <div>
                      <p className="mb-0 font-weight-bold text-black">Phone</p>
                      <p className="mb-4">
                        <a href="#">+977 980 352 6339</a>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <IoMail style={{ fontSize: "3rem", marginRight: "1rem" }} />
                    <div>
                      <p className="mb-0 font-weight-bold text-black">
                        Email Address
                      </p>
                      <p className="mb-0">
                        <a href="#">futsal@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
