import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import useFetch from '../../../customHooks/useFetch'
import { Link } from 'react-router-dom';
import useAuthAxios from '../../../customHooks/useAuthAxios';
const ManageOrders = () => {
  const sessionUser = JSON.parse(localStorage.getItem('auth'));

  const {createAuthAxios} = useAuthAxios();
  const authAxios = createAuthAxios();

  const urlApi = "http://localhost:8081/orders"
  const { fetchData, isFetchLoading, fetchError } = useFetch(urlApi + "/page/1/5");
  console.log(fetchData);

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


  const handleCancel = (id) => {
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

  useEffect(() => {
    localStorage.setItem('userRole', 'USER')
  }, [])

  const handleImageView = (imageUrl)=>{
    window.open("http://localhost:8081/images/"+imageUrl, '_blank');
  }

  const handlePaymentConfirm = (id)=>{
    Swal.fire({
      title: 'Confirm Payment',
      text: 'Are you sure you want to make the payment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        authAxios.get('http://localhost:8081/payments/update/id/'+id)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              'Payment Confirmed'
            );
            window.location.reload();
          }
          else{
            Swal.fire(
              'Error',
              'An error occurred while confirming payment.',
              'error'
            );
          }
        })
        .catch((error) => {
          console.error('Payment failed', error);
        });
      }
    });
  }

  if (isFetchLoading) {
    return (<>Loading</>)
  }

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>User Name</td>
            <td>Price</td>
            <td>Invoice</td>
            <td>Payments</td>
            <td>Order Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>User Name</td>
            <td>1000</td>
            <td>View invoice</td>
            <td>
              Type: Cash on delivery
              <br />
              Status: Completed
            </td>
            <td>PLACED</td>
            <td>
              <button type='button'>Change Status</button>
            </td>
          </tr>
          {
            fetchData.data.content.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}<br /><Link to={`order/view/id/${item.id}`}>View</Link></td>
                  <td>{item.users.name}</td>
                  <td>{item.price}</td>
                  <td>View Invoice</td>
                  <td>
                    Type: {item.payments.type}
                    <br />
                    Status: {item.payments.status}
                    <br />
                    {item.payments.type == "ONLINE" && (
                      <button type='button' onClick={()=>{handleImageView(item.payments.images.name)}}>View</button>
                    )}
                    <br />
                    {sessionUser.roles == "ADMIN" && item.payments.status == "PENDING" && item.payments.status != "CANCELLED" &&(
                      <button type='button' onClick={()=>{handlePaymentConfirm(item.payments.id)}}>Confirm</button>
                    )}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    {sessionUser.roles == "ADMIN" && item.status === 'PLACED' &&
                      <button type='button' onClick={() => { handleConfirm(item.id) }}>Confirm</button>
                    }
                    {sessionUser.roles == "ADMIN" && item.status === 'CONFIRMED' &&
                      <button type='button' onClick={() => { handleDelivery(item.id) }}>Delivery</button>}
                    {sessionUser.roles == "ADMIN" && item.status === 'DELIVERING' &&
                      <button type='button' onClick={() => { handleComplete(item.id) }}>Complete</button>}
                    {sessionUser.roles == "ADMIN" && item.status != 'COMPLETE' && item.status != 'CANCELLED' &&
                      <button type='button' onClick={() => { handleCancel(item.id) }}>Cancel</button>}

                    {sessionUser.roles == "USER" && item.status === 'PLACED' && <button type='button' onClick={() => { handleCancel(item.id) }}>Cancel</button>}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ManageOrders