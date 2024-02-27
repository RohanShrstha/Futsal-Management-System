import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import useCreate from "../../customHooks/useCreate"
import useAuth from "../../customHooks/userAuth"
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const registerApi = "http://localhost:8081/auth/authenticate";

    const { setAuth } = useAuth();

    const authVal = {
        id: '',
        userName: '',
        email: '',
        roles: '',
        token: '',
    }

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const [fail, setFail] = useState(false);

    const [errorMsg, setErrorMsg] = useState([]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { handleCreate } = useCreate(registerApi);

    const onSubmit = async (values, action) => {
        const userData = await handleCreate(values);
        console.log(userData);

        if (userData.name == "AxiosError") {
            let error = "Login Failed "
            if (userData?.response?.data?.message.length > 0) { error = userData?.response?.data?.message }
            setErrorMsg(error);
            setFail(true);
        }
        else {
            authVal.id = userData.id;
            authVal.userName = userData.userName;
            authVal.email = userData.email;
            authVal.roles = userData.roles;
            authVal.token = userData.token;

            const id = userData.id;
            const userName = userData.userName;
            const email = userData.email;
            const roles = userData.roles;
            const token = userData.token;


            setAuth({ id, userName, email, roles, token, });
            localStorage.setItem('auth', JSON.stringify(authVal));
            setFail(false);
            action.resetForm();
            navigate(from, { replace: true });
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const formik = useFormik({
        initialValues: formData,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    })

    return (
        <>
            {fail && errorMsg}
            <div className="container-md mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5 border rounded-3">
                        <form className="p-5" onSubmit={formik.handleSubmit}>
                            <h2 className="text-center">Login</h2>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="email">Email</label>
                                {formik.errors.email && formik.touched.email && <small className="text-danger">{formik.errors.email}</small>}
                            </div>

                            <div className="form-floating mt-3 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="pwd">Password</label>
                                {formik.errors.password && formik.touched.password && <small className="text-danger">{formik.errors.password}</small>}
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <p className="text-center">
                            <Link to="/signup" className="btn btn-success">Register</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login