import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { primaryColor } from '../constants';
import Rating from './Rating';
import Button from './Button';
import ValidateOrder from './ValidateOrder';
import { updateModelVisility } from '../states/features/orders/orderSlice';

const ProductDetails = ({ product }) => {
  const { id, name, image, price, condition, description, user } = product;
  const validateOrder = useSelector((state) => {
    return state.orders.validateOrderModel;
  });
  const dispatch = useDispatch();

  return (
    <div className='product_container flex items-center justify-between gap-12 w-10/12 mx-auto my-12 screen-mid:flex-col'>
      <section className='product_images_container flex items-center gap-6 w-full h-full my-8 mx-4 p-8'>
        <ul className='product_images_small flex flex-col w-1/3 justify-between gap-4 h-full'>
          {image &&
            image.slice(1).map((photo, index) => {
              return (
                <li key={index} className='w-fit h-full'>
                  <img
                    src={photo}
                    className='product_small_image h-[8rem] w-[8rem] object-cover'
                    alt='product'
                  />
                </li>
              );
            })}
        </ul>
        <div className='product_image_main flex items-center justify-center w-full'>
          {image && <img src={image[0]} alt='product' className='w-full' />}
        </div>
      </section>
      <section className='product_details_container flex flex-col w-full items-center justify-between gap-4 h-full px-12'>
        <div className='product_name_price flex items-center justify-between w-full py-4 screen-base:flex-col gap-4'>
          <div className='product_name_description flex flex-col gap-3 items-start screen-base:items-center'>
            <h3 className='text-2xl font-bold screen-base:text-lg'>{name}</h3>
            <p className='text-light text-center'>{description}</p>
          </div>
          <div className='product_price'>
            <p className='text-[2.4rem]'>${price}</p>
          </div>
        </div>
        <hr className='px-4 my-4 bg-black w-11/12 mx-auto' />
        <div className='price_condition_reviews flex items-center w-full justify-between py-4 screen-base:flex-col'>
          <div className='product_price_condition'>
            <p className='flex items-center gap-4'>
              Condition:{' '}
              <span className='text-base font-medium'>{condition}</span>
            </p>
          </div>
          <div className='product_reviews flex gap-2 items-center'>
            <p>Ratings:</p>
            <Rating rating={4} />
          </div>
        </div>
        <div className='product_details_cta flex items-center gap-8 justify-between w-full my-4 mx-auto screen-mid:flex-col'>
          <Button
            value={
              <span className='text-[1.6rem] flex items-center gap-4'>
                <FontAwesomeIcon icon={faCartShopping} />
                Add to cart
              </span>
            }
            className='primary-btn w-full py-4 normal-case text-[1.8rem]'
          />
          <Button
            value={
              <span className='items-center text-[1.6rem] flex gap-4'>
                <FontAwesomeIcon icon={faCreditCard} />
                Buy now
              </span>
            }
            className='primary-btn w-full py-4 normal-case text-[1.8rem]'
            onClick={() => {
              dispatch(updateModelVisility(true));
            }}
          />
          <FontAwesomeIcon
            icon={faHeart}
            id='product_add_wishlist'
            className='w-fit'
            style={{
              fontSize: '4rem',
              color: primaryColor,
              height: '4rem',
              cursor: 'pointer'
            }}
          />
        </div>
        <ValidateOrder
          visible={validateOrder}
          productId={id}
          productName={name}
          price={price}
        />
        <hr className='px-4 my-4 bg-black w-11/12 mx-auto' />
        <div className='product_seller w-full flex flex-col items-start justify-center my-4 mx-auto screen-mid:items-center'>
          <div className='product_seller_description flex gap-4 items-center screen-base:flex-col'>
            <h4 className='text-base font-medium text-start'>
              Product added by
            </h4>
            <Button
              to='#'
              href='#'
              className='product_seller_details bg-white text-black'
              value={
                <span className='flex items-center gap-4 my-4'>
                  <img
                    src='https://res.cloudinary.com/nishimweprince/image/upload/v1685234037/ecommerce/professional-30-1024_yz5xqf.png'
                    alt='Product seller avatar'
                    className='w-8 h-8 rounded-full'
                  />
                  <p>{user?.name || 'User'}</p>
                </span>
              }
            />
          </div>
          <div className='product_seller_cta'>
            <Button
              value={`Browse ${user?.name.split(' ')[0]}'s collection ` || 'Browse collection'}
              className='primary-btn rounded-[.5rem] py-[1rem] w-full normal-case screen-base:text-sm'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    isAvailable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default ProductDetails;
