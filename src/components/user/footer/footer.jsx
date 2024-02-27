import React from "react";

function footer() {
  return (
    <>
      <div className="bg-light p-1">
        <div className="container  w-100">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="/home" className="nav-link px-2 text-muted">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link px-2 text-muted">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="/futsal" className="nav-link px-2 text-muted">
                  Futsal
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link px-2 text-muted">
                  Contact
                </a>
              </li>

              <li className="nav-item">
                <a href="/profile" className="nav-link px-2 text-muted">
                  Profile
                </a>
              </li>
            </ul>

            <div className="d-flex flex-column flex-sm-row justify-content-between ">
              <p>© 2022 Futsal Management System (FMS). All rights reserved.</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-4">
                  <a className="link-dark" href="https:/www.instagram.com">
                    <i className="fa-brands fa-instagram fa-2xl"></i>
                  </a>
                </li>
                <li className="ms-4">
                  <a className="link-dark" href="https:/www.facebook.com">
                    <i className="fa-brands fa-facebook fa-2xl"></i>
                  </a>
                </li>
                <li className="ms-4">
                  <a className="link-dark" href="https:/www.twitter.com">
                    <i className="fa-brands fa-twitter fa-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default footer;
