import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const ShippingDetails = ({ order }) => {
  const inputsClassName = 'py-4 px-8 w-full';
  const [saveDetails, setSaveDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <form className='user_shipping_address h-full w-full flex flex-col gap-8'>
      <div className='flex flex-col items-center gap-8'>
        <span className='flex items-center gap-8 w-full justify-between'>
          <Input
            className={inputsClassName}
            label=''
            placeholder={order?.user?.name}
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
            <input type='radio' className='w-4 text-[1.5rem] cursor-pointer' />
            <p>Office address</p>
          </span>
        </div>
      </div>
      <div className='shopping_details_cta flex items-center w-full justify-between gap-6'>
        <Button
          value={saveDetails ? 'Saved' : 'Save details'}
          className={`primary-btn normal-case ${
            saveDetails ? 'bg-green-600' : 'bg-primary'
          }`}
          onClick={() => {
            return setSaveDetails(!saveDetails);
          }}
        />
        <Button
          value={saveDetails ? 'Cancel' : 'Return'}
          route={saveDetails ? '#' : `/product/${order.productId}`}
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
  );
};

ShippingDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    quantity: PropTypes.number,
    amount: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default ShippingDetails;
