import React from "react";
import axios from "axios";
const useAuthAxios = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  function createAuthAxios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
  }
  return { createAuthAxios };
};

export default useAuthAxios;
