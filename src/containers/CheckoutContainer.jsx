import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import PaymentContainer from '../components/PaymentContainer';
import { useGetSingleOrderQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';
import { updateSingleOrder } from '../states/features/orders/orderSlice';

const CheckoutContainer = ({ id }) => {
  const inputsClassName = 'py-4 px-8 w-full';
  const [saveDetails, setSaveDetails] = useState(false);
  const navigate = useNavigate();

  const order = useSelector((state) => {
    return state.orders.singleOrder;
  });
  const dispatch = useDispatch();

  const {
    data: orderDetails,
    isLoading,
    isSuccess,
    isError,
    error,
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
          <h1 className='text-[3rem] font-bold'>Order not found</h1>
          <Button value='Go to homepage' route='/' />
        </section>
      );
    }
    return (
      <section className='flex flex-col justify-center gap-12 items-center h-[50vh]'>
        <h1 className='text-[3rem] font-bold'>
          Something went wrong. Please check if you are logged in or refresh to
          try again!
        </h1>
        <Button value='Go to homepage' route='/' />
      </section>
    );
  }

  return (
    <section className='flex gap-12 justify-between h-auto min-h-[50vh] w-[90%] mx-auto my-12 screen-base:checkout-container-base'>
      <div className='order_shipping_address_container flex flex-col justify-between items-center gap-12 h-full w-full max-w-[50%] p-8 screen-mid:max-w-[70%] screen-base:max-w-[90%]'>
        <div className='order_details_container w-full max-w-[70%] screen-mid:max-w-[90%]'>
          <h1>Your order:</h1>
          <div className='order_details'>
            <span className='order_details_item'>
              <h3>Product Name:</h3>
              <p>{isLoading ? 'Loading...' : orderDetails.data.product.name}</p>
            </span>
            <span className='order_details_item'>
              <h3>Quantity:</h3>
              <p>{isLoading ? 'Loading...' : `X ${order.quantity}`}</p>
            </span>
          </div>
          <div className='order_total_amount flex w-full justify-between gap-4'>
            <h3 className='text-[2rem] font-medium'>Total</h3>
            <p className='text-[1.8rem] font-black'>{isLoading ? 'Loading...' : `$ ${orderDetails.data.amount}`}</p>
          </div>
        </div>
        <div className='shipping_details_container flex flex-col w-full max-w-[70%] items-start gap-8 screen-mid:max-w-[90%]'>
          <h1 className='text-[3rem] font-bold'>Shipping address</h1>
          <form className='user_shipping_address h-full w-full flex flex-col gap-8'>
            <div className='flex flex-col items-center gap-8'>
              <span className='flex items-center gap-8 w-full justify-between'>
                <Input
                  className={inputsClassName}
                  label=''
                  placeholder={isLoading ? 'Loading...' : `${orderDetails.data.user.name}`}
                />
                <Input className={inputsClassName} label='' value='0788 888 888' />
              </span>
            </div>
            <Input className={inputsClassName} value='Kigali, Rwanda' />
            <div className='shipping_address_type w-full'>
              <div className='address_type_choice flex items-center w-full gap-6 justify-between'>
                <span className='flex items-center gap-4 w-full'>
                  <input type='radio' className='w-4 cursor-pointer' />
                  <p>Home address</p>
                </span>
                <span className='flex items-center gap-4 w-full'>
                  <input
                    type='radio'
                    className='w-4 text-[1.5rem] cursor-pointer'
                  />
                  <p>Office address</p>
                </span>
              </div>
            </div>
            <div className='shopping_details_cta flex items-center w-full justify-between gap-6'>
              <Button
                value={saveDetails ? 'Saved' : 'Save details'}
                className={`primary-btn normal-case ${saveDetails ? 'bg-green-600' : 'bg-primary'}`}
                onClick={() => {return setSaveDetails(!saveDetails)}}
              />
              <Button
                value={saveDetails ? 'Cancel' : 'Return'}
                route={saveDetails ? '#' : `/product/${ isSuccess && order.productId}`}
                onClick={() => {
                  if (saveDetails) {
                    return setSaveDetails(!saveDetails);
                  }
                  return navigate(`/product/${order.productId}`);
                }}
                className='py-4 px-6 text-[1.5rem] w-fit bg-white text-black flex items-center justify-center rounded-lg border-[1px] border-black hover:scale-102'
              />
            </div>
          </form>
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
