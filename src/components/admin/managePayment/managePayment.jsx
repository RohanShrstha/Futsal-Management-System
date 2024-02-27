import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import useFetch from "../../admin/customHooks/useFetch";

const managePayment = () => {
  const urlApi = "http://localhost:8080/payment";

  const { fetchData, setFetchData, fetchDatafunc, fetchError } =
    useFetch(urlApi);

  console.log(fetchData);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsFetchLoading(false);
    }, 1000);
  }, []);

  if (isFetchLoading) {
    return (
      <div class="box">
        <div class="shadow"></div>
        <div class="gravity">
          <div class="ball"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="admin-view">
        <h2>Manage Payment</h2>
        <div className="list">
          <div class="row">
            <div class="col">
              <h3 className="text-uppercase">Payment List</h3>
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
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Payment time</th>
                </tr>
              </thead>
              <tbody>
                {fetchData.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {/* <td>{item.futsal.futsalName}</td> */}
                    <td>{item.payment_method}</td>
                    <td>{item.payment_amount}</td>
                    <td>{item.payment_time}</td>
                    {/* <td>
                      {item.booking_start_time}-{item.booking_end_time}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn button"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td> */}
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

export default managePayment;
