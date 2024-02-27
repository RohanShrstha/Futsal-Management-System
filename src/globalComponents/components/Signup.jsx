import { useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import useCreate from "../../customHooks/useCreate"
function Signup() {
    const REGISTER_URL = "/users/register";

    const { isCreateLoading, createData, handleCreate } = useCreate(REGISTER_URL);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const[success, setSuccess] = useState(false);
    const successText = "Registration Successfull !!!";

    const onSubmit = async (values, action)=>{
        alert(JSON.stringify(values))
        const response = await handleCreate(values);
        console.log(response);
        if(response.status){
            alert("working");
            setSuccess(true);
        }
        action.resetForm();
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("E-mail is required"),
        phoneNumber: Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,'Invalid phone number'),
        password: Yup.string().min(5,"Length should be atleast 5 characters").required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
            'Password must include at least one uppercase letter, one lowercase letter, one special character, and one number'
          ),
        confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Password must match")
    })

    const formik = useFormik({
        initialValues: formData,
        onSubmit,
        validationSchema
    })

    return (
        <>
        {success && <><h1>Registration Successfull !!! </h1> <Link to="/login" className="btn btn-success">Login</Link></>}
            <div className="container-md mt-3">   
                <div className="row justify-content-center">
                    <div className="col-md-6 center mt-5">
                        <form className="p-5 border rounded-3" onSubmit={formik.handleSubmit}>
                        <h2 className="text-center">Signup</h2>
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="Enter User Name" 
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                <label htmlFor ="name">Name</label>
                                {
                                    formik.errors.name && formik.touched.name && <small className="text-danger">{formik.errors.name}</small>
                                }
                            </div>
                            
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="Enter email" 
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} />
                                <label htmlFor ="email">Email</label>
                                {
                                    formik.errors.email && formik.touched.email && <small className="text-danger">{formik.errors.email}</small>
                                }
                            </div>
                            
                            <div className="form-floating mb-3 mt-3">
                                <input 
                                type="number" 
                                className="form-control"
                                placeholder="Enter Phone Number" 
                                name="phoneNumber" 
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                <label htmlFor ="phoneNumber">Phone Number</label>
                                {
                                    formik.errors.phoneNumber && formik.touched.phoneNumber && <small className="text-danger">{formik.errors.phoneNumber}</small>
                                }
                            </div>
                            
                            <div className="form-floating mt-3 mb-3">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter password" 
                                name="password" 
                                value={formik.values.password}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                <label htmlFor ="pwd">Password</label>
                                {
                                    formik.errors.password && formik.touched.password && <small className="text-danger">{formik.errors.password}</small>
                                }
                            </div>
                            
                            <div className="form-floating mt-3 mb-3">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter Confirm password" 
                                name="confirmPassword" 
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}/>
                                <label htmlFor ="cpwd">Confirm Password</label>
                                {
                                    formik.errors.confirmPassword && formik.touched.confirmPassword && <small className="text-danger">{formik.errors.confirmPassword}</small>
                                }
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup