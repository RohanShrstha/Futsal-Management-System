import React from 'react'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import useAuthAxios from '../../../customHooks/useAuthAxios';
import useFetch from '../../../customHooks/useFetch';

const ChangePassword = () => {

  const { createAuthAxios } = useAuthAxios();
  const authAxios = createAuthAxios();

  const url = "http://localhost:8081/config/change-pass";

  // const url = "http://localhost:8081/config/deliveryCharge";

  // const { fetchData, isFetchLoading } = useFetch(url);
  // console.log(fetchData);

  const sessionUser = JSON.parse(localStorage.getItem('auth'));
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().min(5, "Length should be atleast 5 characters").required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
        'Password must include at least one uppercase letter, one lowercase letter, one special character, and one number'
      ),
    newCPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  const formData = {
    id: "",
    oldPassword: "",
    newPassword: "",
    newCPassword: "",
  }

  const handleSubmit = (values) => {
    console.log(values, "values")
    values.id = sessionUser.id;
    authAxios.post(url, values)
      .then(response => {
        alert("Success")
        window.location.reload();
      })
      .catch(error => {
        alert("fail")
      });
  }

  const formik = useFormik({
    initialValues: formData,
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true
  })


  return (
    <div className="container-md mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 border rounded-3">
          <form className="p-5" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">Change Password</h2>
            <div className="form-floating mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Old Password"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="oldPassword">Old Password</label>
              {formik.errors.oldPassword && formik.touched.oldPassword && <small className="text-danger">{formik.errors.oldPassword}</small>}
            </div>

            <div className="form-floating mt-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="New password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="pwd">New Password</label>
              {formik.errors.newPassword && formik.touched.newPassword && <small className="text-danger">{formik.errors.newPassword}</small>}
            </div>

            <div className="form-floating mt-3 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Confirm password"
                name="newCPassword"
                value={formik.values.newCPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="pwd">Confirm Password</label>
              {formik.errors.newCPassword && formik.touched.newCPassword && <small className="text-danger">{formik.errors.newCPassword}</small>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p className="text-center">
            <Link to="/forgot-password" className="btn btn-success">Forgot password</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword