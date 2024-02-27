import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useFetch from '../../../customHooks/useFetch';
import './orders.css'
import useAuthAxios from '../../../customHooks/useAuthAxios';

const ViewOrders = () => {

    const { createAuthAxios } = useAuthAxios();
    const authAxios = createAuthAxios();

    const { id } = useParams();
    const urlApi = "http://localhost:8081/orders"
    const cartApi = "http://localhost:8081/addtocart";

    const { fetchDatafunc } = useFetch();

    useEffect(() => {
        if (id) {
            getData(urlApi + "/id/" + id);
        }
    }, [id])

    const [data, setData] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(true);

    const getData = async (url) => {
        const data = await fetchDatafunc(url);
        console.log("Data fetched")
        console.log(data);
        setData(data);
        setIsDataLoading(false);
    }

    const handleConfirm = (id) => {
        Swal.fire({
            title: 'Confirm Order',
            text: 'Are you sure you want to confirm this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateConfirm(id);
            }
        });
    }

    const updateConfirm = async (id) => {
        try {
            const response = await authAxios.put(urlApi + '/update/status/confirm/id/' + id, null);
            if (response.status === 200) {
                Swal.fire(
                    'Order Confirmed'
                );
                window.location.reload();
            } else {
                Swal.fire(
                    'Error',
                    'Failed to confirm the order.',
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error',
                'An error occurred while confirming the order.',
                'error'
            );
        }
    };


    const handleCancel = () => {
        Swal.fire({
            title: 'Confirm Cancel',
            text: 'Are you sure you want to Cancel this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateCancel(id);
            }
        });

    }

    const updateCancel = async (id) => {
        try {
            const response = await authAxios.put(urlApi + '/update/status/cancel/id/' + id, null);
            if (response.status === 200) {
                Swal.fire(
                    'Order has been Cancelled.'
                );
                window.location.reload();
            } else {
                Swal.fire(
                    'Error',
                    'Failed to Cancel the order.',
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error',
                'An error occurred while cancelling the order.',
                'error'
            );
        }
    };

    const handleComplete = (id) => {
        Swal.fire({
            title: 'Confirm Complete',
            text: 'Are you sure you want to Complete this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateComplete(id);
            }
        });

    }

    const updateComplete = async (id) => {
        try {
            const response = await authAxios.put(urlApi + '/update/status/complete/id/' + id, null);
            if (response.status === 200) {
                Swal.fire(
                    'Order Completed'
                );
                window.location.reload();
            } else {
                Swal.fire(
                    'Error',
                    'Failed to complete the order.',
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error',
                'An error occurred while completing the order.',
                'error'
            );
        }
    };

    const handleDelivery = (id) => {
        Swal.fire({
            title: 'Confirm delivery',
            text: 'Are you sure you want to Complete delivery?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateDelivery(id);
            }
        });
    }

    const updateDelivery = async (id) => {
        try {
            const response = await authAxios.put(urlApi + '/update/status/delivery/id/' + id, null);
            if (response.status === 200) {
                Swal.fire(
                    'Delivery Confirmed'
                );
                window.location.reload();
            } else {
                Swal.fire(
                    'Error',
                    'Failed to confirm Delivery.',
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error',
                'An error occurred while confirming delivery.',
                'error'
            );
        }
    }

    if (isDataLoading) {
        return (<>Loading</>)
    }
    return (
        <div className='container-fluid d-flex'>
            <div className="container content">
                {
                    data.data.carts.map((item, index) => {
                        return (
                            <div key={index} className="container border border-4 mt-4 d-flex outer-box">
                                <div className="container border border-4 image p-3">
                                    <img className="imageView" src={`http://localhost:8081/images/${item.products.imagesList[0].name}`} />
                                </div>
                                <div className="container m-1 p-2 detail">
                                    Name:   {item.products.name}<br />
                                    Brand: {item.products.brand.name}<br />
                                    Price: {item.products.price}<br />
                                    Quantity: {item.quantity}
                                    <br />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className="container summary">
                <div className="summary-info d-flex flex-column mt-4">
                    <span><b>Item(s):   {data.data.carts.length}</b></span>
                    <span><b>Total price:  {data.data.price} </b></span>
                    <span><b>Status price:  {data.data.status} </b></span>
                    <br />
                    {localStorage.getItem('userRole') == "USER" && data.data.status === 'PLACED' && <button type='button' onClick={() => { handleCancel(id) }}>Cancel</button>}
                    {localStorage.getItem('userRole') == "ADMIN" && data.data.status === 'PLACED' &&
                        <button type='button' onClick={() => { handleConfirm(id) }}>Confirm</button>
                    }
                    {localStorage.getItem('userRole') == "ADMIN" && data.data.status === 'CONFIRMED' &&
                        <button type='button' onClick={() => { handleDelivery(id) }}>Delivery</button>}
                    {localStorage.getItem('userRole') == "ADMIN" && data.data.status === 'DELIVERING' &&
                        <button type='button' onClick={() => { handleComplete(id) }}>Complete</button>}
                    {localStorage.getItem('userRole') == "ADMIN" && data.data.status != 'COMPLETE' &&
                        <button type='button' onClick={() => { handleCancel(id) }}>Cancel</button>}
                </div>
            </div>
        </div>
    )
}

export default ViewOrders