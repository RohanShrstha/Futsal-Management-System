import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { useState } from "react";
import { SiCashapp } from "react-icons/si";
import { AiFillFileMarkdown } from "react-icons/ai";
import mainlogo from "../../../assets/logo.png";

const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/admin/manageUsers",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/admin/managePayment",
    name: "Payment",
    icon: <SiCashapp />,
  },
  {
    path: "/admin/manageReserve",
    name: "Reserve",
    icon: <AiFillFileMarkdown />,
  },
  {
    path: "/admin/manageMessage",
    name: "Message",
    icon: <MdMessage />,
  },
  {
    path: "/admin/managefutsal",
    name: "Futsal",
    icon: <TiGroup />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="main-container">
        <div className={`sidebar fixed-left`}>
          <img
            className="admin-logo "
            alt="American Football"
            src={mainlogo}
            style={{ width: 80, padding: 10, marginLeft: 0 }}
          />
          <span className="fw-bolder fs-2">FMS</span>
          <hr
            className="my-1  border-3 opacity-3"
            style={{ paddingBottom: 10 }}
          />

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    route={route}
                    isOpen={isOpen}
                    key={index}
                    setIsOpen={setIsOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <div className="link_text">{route.name}</div>
                </NavLink>
              );
            })}
          </section>
        </div>

        <main className="sidebar-content">{<Outlet />}</main>
      </div>
    </>
  );
};

export default SideBar;
