import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import useFetch from "../../admin/customHooks/useFetch";
import useDelete from "../../admin/customHooks/useDelete";
import { FormattedDateTime } from "../../utils/FormattedDateTime";

const ManageUsers = () => {
  const urlApi = "http://localhost:8080/user";
  const deleteApi = "http://localhost:8080/user/id/";

  const { fetchData, setFetchData, fetchError } = useFetch(urlApi);

  const { isDeleteLoading, deleteData, deleteError, handleDelete } =
    useDelete(deleteApi);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const { getFormattedDateTime } = FormattedDateTime();

  const handleRoleChange = (user) => {
    Swal.fire({
      title: "Do you really want to change the role?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.role === "User") {
          const updatedUser = { ...user, role: "Owner" };
          fetch(`http://localhost:8080/user/id/${user.user_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Server response:", data);
              if (data.status === true) {
                console.log("Updated user:", data.data);
                setFetchData((prevData) => {
                  console.log("Previous data:", prevData.data);
                  const updatedData = prevData.data.map((item) => {
                    console.log(
                      "Comparing:",
                      String(item.user_id),
                      String(user.user_id)
                    );
                    return String(item.user_id) === String(user.user_id)
                      ? updatedUser
                      : item;
                  });
                  console.log("Updated data:", updatedData);
                  return {
                    ...prevData,
                    data: updatedData,
                  };
                });
              }
            })

            .catch((error) => {
              console.error("Error in PUT request:", error);
            });
        } else {
          alert("Role is not User, cannot change to Owner.");
        }
      }
    });
  };

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsFetchLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Fetch user data
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setFetchData(data);
          setIsFetchLoading(false); // Set loading to false when data is received
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsFetchLoading(false); // Set loading to false in case of an error
      });
  }, [urlApi, setFetchData]);

  if (isFetchLoading) {
    return (
      <div className="box">
        <div className="shadow"></div>
        <div className="gravity">
          <div className="ball"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-view">
      <h2>Manage Users</h2>
      <div className="list">
        <div className="row">
          <div className="col">
            <h3 className="text-uppercase">Users List</h3>
          </div>
          <hr />
        </div>

        <div>
          <table
            id="dataTable"
            className="table table-responsive table-width admin-table"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Contact</th>
                <th>Address</th>
                <th>JoinDate</th>
                <th>Status</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchData.data ? (
                fetchData.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.userName} {item.userLname}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td>{getFormattedDateTime(item.joinDate)}</td>
                    <td>{item.status}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        className="btn btn-primary btn button"
                        onClick={() => handleRoleChange(item)}
                      >
                        Role
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger btn button"
                        onClick={() => {
                          handleDelete(item.user_id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
