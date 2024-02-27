import React, { useEffect, useState } from "react";
import useFetch from "../../admin/customHooks/useFetch";
import useUpdate from "../../admin/customHooks/useUpdate";
import { FormattedDateTime } from "../../utils/FormattedDateTime";
import Swal from "sweetalert2"; // Import SweetAlert library

const manageFutsal = () => {
  const urlApi = "http://localhost:8080/futsal";

  const { fetchData, setFetchData } = useFetch(urlApi);

  const { isUpdateLoading, handleUpdate } = useUpdate(urlApi);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const { getFormattedDateTime } = FormattedDateTime();

  const handleStatusChange = (futsal) => {
    // Create a SweetAlert to confirm status change
    Swal.fire({
      title: "Do you really want to change the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes," proceed with status change logic
        const newStatus =
          futsal.futsal_status === "Available" ? "Unavailable" : "Available";
        if (newStatus !== futsal.futsal_status) {
          const updatedFutsal = { ...futsal, futsal_status: newStatus };
          // Send a PUT request to update the futsal's status
          handleUpdate(updatedFutsal) // Use your custom hook for updating
            .then((data) => {
              console.log(data);
              // Check if data is defined and if it has a 'status' property
              if (data && data.status === true) {
                // Update the UI state with the new futsal data
                setFetchData((prevData) => ({
                  ...prevData,
                  data: prevData.data.map((item) =>
                    item.futsal_id === futsal.futsal_id ? updatedFutsal : item
                  ),
                }));
              }
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // Handle the case where the futsal's status is already the desired status.
          console.log(`Status is already ${newStatus}, no need to change.`);
        }
      }
    });
  };

  useEffect(() => {
    // Fetch futsal data
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setFetchData(data);
          setIsFetchLoading(false);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching futsal data:", error);
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
    <>
      <div className="admin-view" style={{ marginLeft: "-38px" }}>
        <h2>Manage Futsal</h2>
        <div className="list">
          <div className="row">
            <div className="col">
              <h3 className="text-uppercase">Futsal List</h3>
            </div>
            <hr />
          </div>

          <div>
            <table
              id="dataTable"
              className="table table-responsive table-width admin-table"
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th className="col-2">Address</th>
                  <th className="col-1">Contact</th>
                  <th>Email</th>
                  <th className="col-1">Price</th>
                  <th className="col-1">W-Price</th>
                  <th className="col-1">Open-Close</th>
                  <th className="col-1">JoinDate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchData.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.futsal_name}</td>
                    <td>{item.futsal_location}</td>
                    <td>{item.futsal_contact}</td>
                    <td>{item.futsal_email}</td>
                    <td>Rs {item.futsal_price}</td>
                    <td>Rs {item.futsal_wprice}</td>
                    <td>
                      {item.futsal_openingTime}AM - {item.futsal_closingTime}PM
                    </td>

                    <td>{getFormattedDateTime(item.futsal_time)}</td>
                    <td>{item.futsal_status}</td>

                    <td>
                      <button
                        className="btn btn-danger btn button"
                        onClick={() => handleStatusChange(item)}
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default manageFutsal;
