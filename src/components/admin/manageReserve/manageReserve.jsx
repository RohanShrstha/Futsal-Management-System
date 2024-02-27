import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import useCreate from "../../admin/customHooks/useCreate";
import useFetch from "../../admin/customHooks/useFetch";
import useUpdate from "../../admin/customHooks/useUpdate";
import useDelete from "../../admin/customHooks/useDelete";
import { FormattedDateTime } from "../../utils/FormattedDateTime";

const manageReserve = () => {
  const urlApi = "http://localhost:8080/reserve";
  const deleteApi = "http://localhost:8080/reserve/id/";

  const { fetchData, setFetchData, fetchDatafunc, fetchError } =
    useFetch(urlApi);

  const { isDeleteLoading, deleteData, deleteError, handleDelete } =
    useDelete(deleteApi);

  console.log(fetchData);
  console.log(deleteError);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const { getFormattedDateTime } = FormattedDateTime();

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsFetchLoading(false);
    }, 1000);
  }, []);

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
      <div className="admin-view" style={{ marginLeft: "-18px" }}>
        <h2>Manage Reserve</h2>
        <div className="list">
          <div className="row">
            <div className="col">
              <h3 className="text-uppercase">Reserve List</h3>
            </div>
            <hr />
          </div>
          <div>
            <table
              id="dataTable"
              className="table table-responsive table-width admin-table"
              style={{ position: "relative", top: "-16px", fontSize: "14px" }}
            >
              <thead>
                <tr
                  className="fs-5"
                  style={{
                    textAlign: "center",
                    paddingTop: "-25px !important",
                  }}
                >
                  <th colSpan={7}>Futsal</th>
                  <th
                    colSpan={5}
                    style={{
                      borderLeft: "1px solid #DEE2E6",
                    }}
                  >
                    User
                  </th>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>Address</th>
                  <th>Futsal</th>
                  <th className="col-1">Contact</th>
                  <th>Price</th>
                  <th>BookingDate</th>
                  <th>MatchTime</th>
                  <th style={{ borderLeft: "1px solid #DEE2E6" }}>User</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th className="col-1">BookingTime</th>
                </tr>
              </thead>
              <tbody>
                {fetchData.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.futsal?.futsalName}</td>
                    <td>{item.futsal?.futsal_location}</td>
                    <td>{item.futsal?.futsal_contact}</td>
                    <td>{item.futsal?.futsal_price}</td>
                    <td>{item.booking_date}</td>
                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {item.booking_start_time}-{item.booking_end_time}
                    </td>
                    <td style={{ borderLeft: "1px solid #DEE2E6" }}>
                      {item.users?.userName} {item.users?.userLname}
                    </td>
                    <td>{item.users?.address}</td>
                    <td>{item.users?.contact}</td>
                    <td>{getFormattedDateTime(item.booking_time)}</td>
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

export default manageReserve;
