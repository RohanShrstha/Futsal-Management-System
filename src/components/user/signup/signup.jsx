import run_img from "../../../assets/sign.png";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import useCreate from "../../admin/customHooks/useCreate";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { isCreateLoading, createData, createError, handleCreate } = useCreate(
    "http://localhost:8080/user"
  );

  const validationSchema = yup.object().shape({
    userName: yup.string().required("First Name is required"),
    userLname: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    contact: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
    password: yup.string().required("Password is required"),

    confirmPassword: yup.string().required("Confirm password is required"),
  });

  const validateField = async (fieldName, value) => {
    try {
      await yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get password and confirm password values from the form
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      // Passwords don't match, display an error message
      setErrors({ confirmPassword: "Password doesn't match" });
      return;
    }

    try {
      // Validate form data
      const formData = {
        userName: e.target.userName.value,
        userLname: e.target.userLname.value,
        email: e.target.email.value,
        contact: e.target.contact.value,
        address: e.target.address.value,

        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
        status: "Active",
        role: "User",
      };

      await validationSchema.validate(formData, { abortEarly: false });
      await handleCreate(formData);
      Swal.fire({
        title: "User Created!",
        text: "User has been created successfully.",
        icon: "success",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        // Navigate to the login page or any other page as needed
        navigate("/");
      });
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <section>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={run_img} className="img-fluid pt-5" alt="Unavailable" />
            </div>
            <div className="col-md-8 col-xl-4 offset-xl-0">
              <form onSubmit={handleSubmit}>
                <div className="divider d-flex align-items-center">
                  <p className="text-center fw-bold fs-2">Signup Here</p>
                </div>

                <div className="form-outline mb-3">
                  <div className="row">
                    <div className="col">
                      <TextField
                        id="userName"
                        name="userName"
                        label="First Name"
                        variant="outlined"
                        className="form-control form-control-lg"
                        error={Boolean(errors.userName)}
                        helperText={errors.userName}
                        onBlur={(e) =>
                          validateField("userName", e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <TextField
                        id="userLname"
                        name="userLname"
                        label="Last Name"
                        variant="outlined"
                        className="form-control form-control-lg"
                        error={Boolean(errors.userLname)}
                        helperText={errors.userLname}
                        onBlur={(e) =>
                          validateField("userLname", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    className="form-control form-control-lg"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    onBlur={(e) => validateField("email", e.target.value)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    id="contact"
                    name="contact"
                    label="Phone Number"
                    variant="outlined"
                    className="form-control form-control-lg"
                    error={Boolean(errors.contact)}
                    helperText={errors.contact}
                    onBlur={(e) => validateField("contact", e.target.value)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    className="form-control form-control-lg"
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    onBlur={(e) => validateField("address", e.target.value)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    className="form-control form-control-lg"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    onBlur={(e) => validateField("password", e.target.value)}
                  />
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    className="form-control form-control-lg"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    onBlur={(e) =>
                      validateField("confirmPassword", e.target.value)
                    }
                  />
                </div>

                <div className="text-center text-lg-start mt-1">
                  <button
                    type="submit"
                    className="btn logbtn btn-primary btn-lg"
                  >
                    {isCreateLoading ? "Signing up..." : "Sign up"}
                  </button>

                  {createError && (
                    <p className="text-danger">{createError.message}</p>
                  )}
                  {createData && (
                    <p className="text-success text-center">
                      User created successfully!
                    </p>
                  )}
                  <p className="medium fw-italic mt-3 pt-1 mb-0">
                    Already have an account?{" "}
                    <NavLink className="mt no-underline" to="/">
                      Log in
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
