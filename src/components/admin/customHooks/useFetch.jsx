import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (getApi) => {
  const [fetchData, setFetchData] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchDataMethod() {
      try {
        const response = await axios.get(getApi);
        setFetchData(response.data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setIsFetchLoading(false);
      }
    }

    fetchDataMethod();
  }, [getApi]);

  return { fetchData, setFetchData, isFetchLoading, fetchError };
};

export default useFetch;
