import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import Button from './Button';
import { useCreateOrderMutation } from '../states/api/apiSlice';
import Loading from './Loading';
import {
  setOrderId,
  updateModelVisility
} from '../states/features/orders/orderSlice';

const ValidateOrder = ({ visible, productName, productId, price }) => {
  const [formData, setFormData] = useState({
    productName,
    productId,
    price,
    quantity: 1,
    amount: price
  });

  const navigate = useNavigate();

  const [
    createOrder,
    { data: orderData, error, isLoading, isError, isSuccess }
  ] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    createOrder({
      desiredQuantity: formData.quantity,
      productId: formData.productId,
      amount: formData.amount
    });
    if (isSuccess) {
      dispatch(setOrderId(orderData.data.id));
      navigate(`/order/${orderData.data.id}`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setOrderId(orderData.data.id));
    }
  }, [orderData]);

  return (
    <section
      className={`overlay_container ${
        visible ? 'flex' : 'collapse'
      } absolute right-2 left-2 bottom-2 top-2 shadow-2xl z-999 rounded-lg py-12 m-auto flex flex-col items-center justify-center`}
      style={{
        background: 'rgba(0,0,0,0.5)'
      }}
    >
      <div className='relative h-fit w-fit min-h-[60%] min-w-[50%] p-12 bg-white'>
        <div className='absolute top-6 right-6 shadow-lg rounded-[50%]'>
          <Button
            value={
              <span className='w-fit h-fit rounded-[50%]'>
                <FontAwesomeIcon className='text-sm rounded-[50%]' icon={faX} />
              </span>
            }
            onClick={() => {
              dispatch(updateModelVisility(false));
            }}
            className='primary-btn rounded-[50%] p-4'
          />
        </div>
        <div className='overlay_form_container w-full h-full flex flex-col items-center justify-center'>
          <form className='validate_order_form w-[60%] flex flex-col items-center gap-6'>
            <Input type='text' label='' value={productName} readOnly />
            <Input type='text' label='' value={price} readOnly />
            <Input
              type='text'
              label='Quantity'
              color='black'
              value={1}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  quantity: e.target.value,
                  amount: price * e.target.value
                });
              }}
            />
            <div className='order_amount'>
              <p className='text-2xl font-bold text-center'>
                Total: ${formData.amount}
              </p>
            </div>
            <div
              className={`${
                isError || isSuccess ? 'flex' : 'hidden'
              } create_order_feedbacks`}
            >
              <p
                className={
                  isSuccess ? 'flex text-green-500 text-center' : 'hidden'
                }
              >
                Order created successfully
              </p>
              <p
                className={
                  isError && error.status === 400
                    ? 'flex text-center text-red-600'
                    : 'hidden'
                }
              >
                Order could not be created. The quantity you requested is not
                available
              </p>
              <p
                className={
                  isError && error.status !== 400
                    ? 'flex text-center text-red-500'
                    : 'hidden'
                }
              >
                An error occured. Please try again
              </p>
            </div>
            <Button
              type='submit'
              value={
                <span className='text-[1.5rem] flex items-center gap-2'>
                  <Loading className={isLoading ? 'flex' : 'hidden'} />
                  {isSuccess ? 'Continue to checkout' : 'Confirm'}
                </span>
              }
              route={isSuccess ? `/order/${orderData.data.id}` : '#'}
              className='primary-btn w-fit'
              onClick={() => {
                handleSubmit();
              }}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

ValidateOrder.propTypes = {
  visible: PropTypes.bool,
  productName: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};

ValidateOrder.defaultProps = {
  visible: false
};

export default ValidateOrder;
