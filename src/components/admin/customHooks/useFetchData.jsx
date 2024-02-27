import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'

export const useFetchData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (urlApi) => {
        try {
            setLoading(true);
            const response = await axios.get(urlApi);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
    };


    const fetchPaginationData = async (urlApi, currentPage) => {
        try {
            setLoading(true);
            const response = await axios.get(urlApi + currentPage);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
    };

    return { fetchData, fetchPaginationData, loading, error }
};

export default useFetchData;
