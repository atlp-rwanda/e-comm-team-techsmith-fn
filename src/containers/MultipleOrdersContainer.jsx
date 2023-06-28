
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetAllOrdersUserQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';
import OrderDetails from '../components/OrderDetails';
import { setOrdersCheckout, updateOrders } from '../states/features/orders/orderSlice';
import Button from '../components/Button';
import ShippingDetails from '../components/ShippingDetails';
import PaymentContainer from '../components/PaymentContainer';
import Pagination from '../components/Pagination';

const MultipleOrdersContainer = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => {
    return state.orders;
  });

  const singleOrder = useSelector((state) => {
    return state.orders.singleOrder;
  });

  const [getAllOrdersUser, { data, isLoading, isError, isSuccess, error }] =
    useLazyGetAllOrdersUserQuery();

  const [ordersToPay, setOrdersToPay] = useState({
    ids: [],
    amount: 0,
    user: {},
  })

  const { page, size } = useSelector((state) => {
    return state.pagination;
  })

  useEffect(() => {
    getAllOrdersUser({ size, page });
    if(isSuccess && data.data.rows.length > 0){
      dispatch(updateOrders(data.data.rows));
    }
  }, []);

  useEffect(() => {
    getAllOrdersUser({ size, page });
  }, [singleOrder, size, page]);

  useEffect(() => {
    if (isSuccess && data.data.rows.length > 0) {
      dispatch(updateOrders(data.data.rows));
      setOrdersToPay({
        ids: data.data.rows.map((order) => {
          return order.id;
        }),
        amount: data.data.rows.reduce((acc, order) => {
          return acc + order.amount;
        }, 0),
        user: data.data.rows[0].user,
      })
      dispatch(setOrdersCheckout(ordersToPay));
    }
  }, [data]);

  if (orders.length <= 0) {
    return (
      <section className='flex flex-col justify-center gap-12 items-center h-[50vh]'>
        <h1 className='text-[3rem] font-bold text-center'>
          You have not made any orders yet. Checkout our catalogue in the
          meantime.
        </h1>
        <Button value='Browse products' route='/category' />
      </section>
    );
  }


  if (isError) {
    if (error.status === 404) {
      return (
        <section className='flex flex-col justify-center gap-12 items-center h-[50vh]'>
          <h1 className='text-[3rem] font-bold text-center'>
            You have not made any orders yet. Checkout our catalogue in the
            meantime.
          </h1>
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
  if (isLoading) {
    return (
      <section className='flex flex-col justify-center items-center gap-12 h-[50vh]'>
        <Loading width={50} />
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className='flex flex-col justify-center gap-12 items-center h-[50vh]'>
        <h1 className='text-[3rem] font-bold text-center'>
          You have not made any orders yet. Checkout our catalogue in the meantime.
        </h1>
        <Button value='Browse products' route='/category' />
      </section>
    );
  }

  return (
    <section className='flex items-start w-[90%] mx-auto justify-between gap-12 my-12 p-8 screen-mid:flex-col-reverse screen-base:mutliple-checkout-base'>
      <div className='flex flex-col items-center justify-between gap-12 screen-mid:multiple-checkout-information-mid screen-base:flex-col'>
        <div className='shipping_container flex flex-col gap-8'>
          <h1 className='text-[3rem] font-bold'>Shipping address</h1>
          {isLoading ? (
            <Loading width={50} />
          ) : (
            <ShippingDetails order={orders[0]} />
          )}
        </div>
        <div className='payment_container w-full'>
          {isLoading ? (
            <Loading width={50} />
          ) : (
            <PaymentContainer multiple ordersCheckout={ordersToPay} />
          )}
        </div>
      </div>
      <div className='multiple_checkout_container h-full flex w-full max-w-[50%] gap-8 flex-col items-start min-h-[80vh] screen-mid:max-w-[80%]'>
        <h1 className='text-[3rem] font-bold text-start'>Your orders:</h1>
        {isLoading ? (
          <Loading width={50} />
        ) : (
          <div className='order_details_container flex flex-col items-center gap-8 flex-wrap screen-mid:flex-row'>
            {orders.map((order) => {
              return (
                <OrderDetails
                  order={order}
                  key={order.id}
                  checkoutPage={false}
                />
              );
            })}
          </div>
        )}
        <Pagination totalPages={data?.data?.totalPages} className='max-w-[50%]' />
      </div>
    </section>
  );
};

export default MultipleOrdersContainer;
