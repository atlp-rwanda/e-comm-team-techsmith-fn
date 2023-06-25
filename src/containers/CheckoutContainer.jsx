import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import PaymentContainer from '../components/PaymentContainer';
import { useGetSingleOrderQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';
import OrderDetails from '../components/OrderDetails';
import { updateSingleOrder } from '../states/features/orders/orderSlice';
import ShippingDetails from '../components/ShippingDetails';

const CheckoutContainer = ({ id }) => {

  const dispatch = useDispatch();

  const {
    data: orderDetails,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSingleOrderQuery(id);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSingleOrder(orderDetails.data));
    }
  }, [orderDetails]);


  if (isError) {
    if (error.status === 404) {
      return (
        <section className='flex flex-col justify-center gap-12 items-center h-[50vh]'>
          <h1 className='text-[3rem] font-bold text-center'>We cannot find this order. Checkout our catalogue in the meantime.</h1>
          <Button value='Browse products' route='/category' />
        </section>
      );
    }
    return (
      <section className='flex flex-col justify-center items-center gap-12 h-[50vh]'>
        <h1 className='text-[3rem] font-bold text-center'>
          Something went wrong. Please check if you are logged in or refresh to
          try again!
        </h1>
        <Button value='Go to login' route='/login' />
      </section>
    );
  }

  return (
    <section className='flex gap-12 justify-between h-auto min-h-[50vh] w-[90%] mx-auto my-12 screen-base:checkout-container-base'>
      <div className='order_shipping_address_container flex flex-col justify-between items-center gap-12 h-full w-full max-w-[50%] p-8 screen-mid:max-w-[70%] screen-base:max-w-[90%]'>
        <div className='shipping_details_container flex flex-col w-full max-w-[70%] items-start gap-8 screen-mid:max-w-[90%]'>
          {isLoading ? <Loading width={50} /> : <OrderDetails order={orderDetails.data} />}
          <h1 className='text-[3rem] font-bold'>Shipping address</h1>
          {
            isLoading ? <Loading width={50} /> : <ShippingDetails order={orderDetails.data} />
          }
        </div>
      </div>
      <div className='payment_details_container w-full p-8 flex items-center justify-evenly'>
        {isLoading ? (
          <div className='w-full h-full flex items-center justify-evenly'>
            <Loading width={50} />
          </div>
        ) : (
          <PaymentContainer order={orderDetails.data} />
        )}
      </div>
    </section>
  );
};

CheckoutContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default CheckoutContainer;
