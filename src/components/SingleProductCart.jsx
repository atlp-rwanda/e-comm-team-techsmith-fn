import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { RxCrossCircled } from 'react-icons/rx';
import AddRemoveButton from './AddRemoveButton';
import { deleteSingleItem } from '../states/features/cart/cartSlice';

const SingleProduct = ({
  name,
  details,
  piecePrice,
  quantity,
  image,
  prodId
}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    return state.cart;
  });

  const deleteItem = (id) => {
    cart.filter((item) => {
      return id !== item.productId;
    });
    dispatch(deleteSingleItem(id));
    return cart;
  };

  return (
    <div>
      <div className='singleItem bg-white flex space-x-10 item-top  py-3 my-3 rounded-xl relative'>
        <div className='bg-gray-200 mx-5 my-auto'>
          <img src={image} alt='white shoes' className='w-40 flex-grow-2' />
        </div>

        <div className='itemDetails flex justify-between flex-col w-full'>
          <h2 className='text-xl font-bold text-thickGrayText'>{name}</h2>
          <p className='text-grayText text-sm'>{details}</p>

          <div className='flex items-center justify-between pr-4 w-full mt-7'>
            <p className='price text-xs text-thickGrayText'>
              {piecePrice}/<i>piece</i>
            </p>

            <AddRemoveButton count1={quantity} />

            <p className='text-sm'>{piecePrice}</p>
          </div>
        </div>

        <div
          role='button'
          className='absolute top-2 right-4 inline-flex bg-white text-thickGrayText hover:bg-primary hover:text-white rounded-md cursor-pointer px-2 py-2'
          onClick={() => {
            deleteItem(prodId);
          }}
        >
          <RxCrossCircled />
        </div>
      </div>
      <hr className='border-none bg-white  w-full h-2' />
    </div>
  );
};

SingleProduct.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  piecePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  image: PropTypes.string.isRequired,
  prodId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default SingleProduct;
