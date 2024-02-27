import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from '../auth/AuthProvider';
import useAuth from '../../customHooks/userAuth';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    // const {createCookie, getAuthCookieValue} = useCookie();

    const logout = () => {
        setAuth({});
        localStorage.clear();
        // createCookie('auth', '', 0);
        // createCookie('token', '', 0);
        navigate('/login');
    }

    // console.log(document.cookie);

    // console.log(getAuthCookieValue());

    // useEffect(() => {
    //     console.log(getAuthCookieValue());
    // }, []);

    const { auth } = useAuth();
    return (
        <>
            {auth.roles}
            <div>This is home</div>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </>
    )
}
export default Home