import React, { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../admin/customHooks/useFetch";
import useDelete from "../../admin/customHooks/useDelete";
import { FormattedDateTime } from "../../utils/FormattedDateTime";

const manageMessage = () => {
  const urlApi = "http://localhost:8080/message";
  const deleteApi = "http://localhost:8080/message/id/";

  const { fetchData, setFetchData, fetchDatafunc, fetchError } =
    useFetch(urlApi);

  const { isDeleteLoading, deleteData, deleteError, handleDelete } =
    useDelete(deleteApi);

  console.log(fetchData);
  console.log(deleteError);

  const [isFetchLoading, setIsFetchLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsFetchLoading(false);
    }, 1000);
  }, []);

  const { getFormattedDateTime } = FormattedDateTime();

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
      <div className="admin-view">
        <h2>Manage Message</h2>
        <div className="list">
          <div class="row">
            <div class="col">
              <h3 className="text-uppercase">Message List</h3>
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
                  <th className="col-1 text-center">ID</th>
                  <th className="col-2">E-mail</th>
                  <th className="col-2">Time</th>
                  <th className="col-2">Subject</th>
                  <th className="col-4">Description</th>
                  <th className="col-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchData.data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.messageEmail}</td>
                    <td>{getFormattedDateTime(item.messageTime)}</td>
                    <td>{item.messageSubject}</td>
                    <td>{item.messageDescription}</td>
                    <td>
                      <button
                        className="btn btn-danger btn button"
                        onClick={() => {
                          handleDelete(item.messageId);
                        }}
                      >
                        Delete
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

export default manageMessage;
