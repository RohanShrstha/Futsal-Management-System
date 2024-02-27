import { useState } from "react";
import axios from "axios";

export const useUpdate = (updateApi) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const handleUpdate = async (values) => {
    setIsUpdateLoading(true);
    setUpdateError(null);

    try {
      const response = await axios.put(updateApi, values);
      setUpdateData(response.data);
    } catch (error) {
      setUpdateError(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return { isUpdateLoading, updateData, updateError, handleUpdate };
};

export default useUpdate;
