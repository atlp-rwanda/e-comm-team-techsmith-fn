import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';
import Button from './Button';
import { primaryColor } from '../constants';
import {
  useGetAllWishlistQuery,
  usePostAddToWishlistMutation
} from '../states/api/apiSlice';
import { findInArrayWishList } from '../utils/Arrays';

const HomeCategoryProductCard = ({
  className,
  buttonClassName,
  price,
  name,
  category,
  description,
  image,
  route,
  rating,
  pId
}) => {
  const [isWishListed, setIsWishListed] = useState(false);

  const [postAddToWishList, { isSuccess, isLoading }] =
    usePostAddToWishlistMutation();

  const { data: wishListData, isSuccess: wishListSuccess } =
    useGetAllWishlistQuery();

  useEffect(() => {
    if (wishListSuccess) {
      if (wishListData.data) {
        const id = findInArrayWishList(
          wishListData.data.availableProducts,
          pId
        );
        if (id) {
          setIsWishListed(true);
        }
      }
    }
    if (isSuccess) {
      setIsWishListed(true);
    }
  }, [isSuccess, wishListSuccess, wishListData]);

  return (
    <div className={`home_category_product_card ${className}`}>
      <section className='category_product_image_container '>
        <img
          src={image}
          alt={name}
          className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500'
        />
      </section>
      <section className='product_category_text_container'>
        <div className='category_product_name_price'>
          <h4 className='truncate text-ellipsis text-[1.6rem]'>{name}</h4>
          <p>{price}</p>
        </div>
        <p className='product_category_description max-w-[90%] truncate text-ellipsis'>
          {description}
        </p>
        <div className='product_category_rating'>
          <Rating rating={rating.rating} performrating={rating.performRating} />
        </div>
        <Button
          className='home_product_category bg-transparent'
          route={route}
          value={category}
        />
      </section>
      <section className='product_category_cta'>
        <Button
          value='Buy'
          route={`/product/${pId}`}
          className={`primary-btn ${buttonClassName}`}
        />
        <FontAwesomeIcon
          id='category_wishlist_icon'
          style={
            isSuccess || isWishListed
              ? {
                  height: '100%',
                  width: '3rem',
                  maxWidth: '3rem',
                  fontWeight: 'light',
                  color: 'tomato',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }
              : {
                  height: '100%',
                  width: '3rem',
                  maxWidth: '3rem',
                  fontWeight: 'light',
                  color: 'white',
                  stroke: 'black',
                  strokeWidth: '2rem',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }
          }
          icon={faHeart}
          onClick={(e) => {
            e.preventDefault();
            postAddToWishList({ productId: pId });
          }}
          className='bg-transparent'
        />
      </section>
      <div className='add_wishlist_feedback'>
        <p
          className={
            isLoading
              ? 'flex text-[1.2rem] my-4 transition-all duration-100 text-gray-800'
              : 'hidden'
          }
        >
          Adding product to wishlist
        </p>
      </div>
    </div>
  );
};

HomeCategoryProductCard.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pId: PropTypes.number,
  route: PropTypes.string,
  rating: PropTypes.shape({
    rating: PropTypes.number,
    count: PropTypes.number,
    color: PropTypes.shape({
      filled: PropTypes.string,
      unfilled: PropTypes.string
    }),
    performRating: PropTypes.bool,
    onRating: PropTypes.func,
    className: PropTypes.string
  })
};

HomeCategoryProductCard.defaultProps = {
  className: 'home_category_product_card',
  buttonClassName: 'home_product_category_button',
  description: 'Brand new product',
  image:
    'https://res.cloudinary.com/nishimweprince/image/upload/v1685229667/ecommerce/c08012248_thyevv.png',
  route: '#',
  rating: {
    rating: 4,
    count: 5,
    color: {
      filled: primaryColor,
      unfilled: '#DCDCDC'
    },
    performRating: false
  },
  category: 'Category',
  pId: 0
};

export default HomeCategoryProductCard;
