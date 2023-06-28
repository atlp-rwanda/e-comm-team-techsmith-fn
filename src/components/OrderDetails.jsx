import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const OrderDetails = ({ order, className, checkoutPage }) => {
  return (
    <div
      className={`order_details flex gap-6 items-start h-full w-fit max-w-[100%] screen-mid:max-w-[90%] ${className}`}
    >
      <div className='order_details_image_container h-full w-[60%]'>
        <img
          src={order?.product?.image[0]}
          alt={order?.product?.name}
          className='w-full max-w-[20rem] h-full object-cover rounded-lg'
        />
      </div>
      <div className='order_details_info_container w-[40%] flex flex-col h-full justify-between gap-4'>
        <h2 className='text-[1.8rem] font-bold truncate text-ellipsis'>
          {order?.product?.name}
        </h2>
        <span className='flex items-center w-full justify-between gap-6'>
        <p>
          <span className='text-[1.5rem] font-light'>Price</span>:{' '}
          {order?.product?.price}
        </p>
        <p>X{order?.quantity}</p>
        </span>
        <h3 className='text-[2rem] font-black'>Total: {order?.amount}</h3>
        <Button
          value='Buy now'
          route={`/order/${order?.id?.toString()}`}
          className={`primary-btn px-6 py-2 w-fit text-[1.5rem] normal-case ${checkoutPage ? 'hidden' : ''}`}
        />
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired,
  className: PropTypes.string,
checkoutPage: PropTypes.bool
};

OrderDetails.defaultProps = {
    className: '',
    checkoutPage: true
};

export default OrderDetails;
