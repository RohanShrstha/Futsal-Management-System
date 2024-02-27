import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../admin/customHooks/userAuth";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";

function NavBar() {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display a combined confirmation dialog using SweetAlert
    Swal.fire({
      title: "Confirm Logout",
      text: "Do you really want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with logout
        localStorage.removeItem("auth");
        navigate("/");
      }
    });
  };

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

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const handleFutsalButtonClick = () => {
    if (userData?.futsal?.futsal_id) {
      navigate(`/myfutsal/${userData.futsal.futsal_id}`);
    } else {
      navigate("/createfutsal");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between px-5 mx-4">
          <div className="d-flex">
            <a className="navbar-brand me-2 mb-1 d-flex align-items-center">
              <img src={logo} height="60" alt="FMS Logo" loading="lazy" />
            </a>
          </div>

          <ul className="navbar-nav flex-row ">
            <li className="nav-item me-3 me-lg-1 fs-4 mr-2">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-3 me-lg-1 fs-4">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item me-3 me-lg-1 fs-4">
              <NavLink className="nav-link" to="/futsal">
                Futsal
              </NavLink>
            </li>
            <li className="nav-item me-3 me-lg-1 fs-4">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`dropdown-item nav-link d-sm-flex align-items-sm-center ${
                  isDropdownOpen ? "show" : ""
                }`}
                href="#"
                onClick={toggleDropdown}
              >
                <b className="d-none d-sm-block  fs-4">
                  <i className="fas fa-user-circle" aria-hidden="true"></i>
                  &nbsp;{auth?.userName}
                </b>
                &nbsp;&nbsp;
                <i className="fas fa-angle-down mt-1" aria-hidden="true"></i>
              </a>
              <ul
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/profile">
                    Go to Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/editprofile">
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/changepassword">
                    Change Password
                  </a>
                </li>
                {userData?.role === "Owner" && (
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={handleFutsalButtonClick}
                      style={{ cursor: "pointer" }}
                    >
                      My Futsal
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
