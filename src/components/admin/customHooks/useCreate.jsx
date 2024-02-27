import { useState } from "react";
import useAuthAxios from "./useAuthAxios";

const useCreate = (createApi) => {
  const { createAuthAxios } = useAuthAxios();
  const authAxios = createAuthAxios();
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const handleCreate = async (values) => {
    setIsCreateLoading(true);
    setCreateError(null);

    try {
      const response = await authAxios.post(createApi, values);
      return response.data;
    } catch (error) {
      setCreateError(error);
      return error;
    } finally {
      setIsCreateLoading(false);
    }
  };

  return { isCreateLoading, createError, handleCreate };
};

export default useCreate;
