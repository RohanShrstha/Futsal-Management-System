import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import useCreate from "../../admin/customHooks/useCreate";
import useAuth from "../../admin/customHooks/userAuth";
import { useFormik } from "formik";

function Login() {
  const registerApi = "http://localhost:8080/auth/authenticate";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fail, setFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // Define errorMsg state

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = async (values, action) => {
    const userData = await handleCreate(values);

    if (userData.name === "AxiosError") {
      let error = "Login Failed ";
      if (userData?.response?.data?.message.length > 0) {
        error = userData?.response?.data?.message;
      }
      setErrorMsg("E-mail or password is not correct. Please try again");
      setFail(true);

      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else {
      authVal.user_id = userData.user_id;
      authVal.userName = userData.userName;
      authVal.email = userData.email;
      authVal.role = userData.role;
      authVal.token = userData.token;

      const user_id = userData.user_id;
      const userName = userData.userName;
      const email = userData.email;
      const role = userData.role;
      const token = userData.token;

      setAuth({ user_id, userName, email, role, token });
      localStorage.setItem("auth", JSON.stringify(authVal));
      setFail(false); // Set the fail state to false for successful login
      action.resetForm();
      navigate("/home", { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const { setAuth } = useAuth();

  const authVal = {
    user_id: "",
    userName: "",
    email: "",
    role: "",
    token: "",
  };

  const navigate = useNavigate();

  const { handleCreate } = useCreate(registerApi);

  return (
    <>
      <section className="">
        <div className="container-fluid h-custom mt-5 pt-4">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://canadalegalbetting.com/wp-content/uploads/2022/07/soccer-betting.jpeg"
                className="img-fluid  pt-5"
                alt="Unavailable"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-0">
              <form onSubmit={formik.handleSubmit}>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold fs-2 ">Login Here</p>
                </div>

                <div className="form-outline mb-4">
                  <TextField
                    id="email"
                    label="Enter your Email"
                    variant="outlined"
                    className="form-control form-control-lg"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error-message ml-2 mt-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="form-outline mb-3">
                  <TextField
                    id="password"
                    type="password"
                    label="Enter your password"
                    variant="outlined"
                    className="form-control form-control-lg "
                    aria-invalid="false"
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="on"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error-message ml-2 mt-2">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="mt-3 text-center ">
                  <NavLink
                    className="link-danger no-underline bg-white"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Did you really forget?
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Please be relax and try to remember your password. So
                        that you can try again.
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-lg-center mt-3">
                  <button
                    type="submit"
                    className="btn logbtn btn-primary btn-lg"
                  >
                    Log in
                  </button>
                  {fail && errorMsg && (
                    <div className="error-message mt-2">{errorMsg}</div>
                  )}
                  <p className="medium fw-italic mt-3 pt-1 mb-0">
                    Don't have an account?{" "}
                    <NavLink className="mt no-underline" to="/signup">
                      Register
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
}

export default Login;
