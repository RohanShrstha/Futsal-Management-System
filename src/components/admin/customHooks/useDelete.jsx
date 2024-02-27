import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export const useDelete = (deleteApi) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    const confirmed = await showDeleteConfirmation();
    if (confirmed) {
      setIsDeleteLoading(true);
      setDeleteError(null);
      try {
        const response = await axios.delete(deleteApi + id);
        setDeleteData(response.data);
        window.location.reload();
      } catch (error) {
        setDeleteError(error);
      } finally {
        setIsDeleteLoading(false);
      }
    }
  };

  const showDeleteConfirmation = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: false,
    });

    return result.isConfirmed;
  };

  return { isDeleteLoading, deleteData, deleteError, handleDelete };
};
export default useDelete;
