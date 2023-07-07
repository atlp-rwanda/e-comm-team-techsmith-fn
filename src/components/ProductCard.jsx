import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {Rating as MRating} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BsCartPlus } from 'react-icons/bs';
import Button from './Button';
import { primaryColor } from '../constants';
import {
  useLazyGetAllWishlistQuery,
  usePostAddToWishlistMutation
} from '../states/api/apiSlice';
import { findInArrayWishList } from '../utils/Arrays';
import { addToCart, getCart } from '../states/features/cart/cartSlice';
import Loading from './Loading';

const ProductCard = ({
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

  const [getAllWishlist, { data: wishListData, isSuccess: wishListSuccess }] =
    useLazyGetAllWishlistQuery();

  useEffect(() => {
    getAllWishlist();
  }, []);

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

  // ADD TO CART
  const dispatch = useDispatch();

  const { isAdded, cart } = useSelector((state) => {
    return state.cart;
  });
  const notInCart =
    'primary-btn border bg-white border-thickGrayText text-black h-[3.2rem] ease-in-out duration-10 w-[7rem] hover:text-white';
  const inCart =
    'primary-btn bg-green-900 border text-white h-[3.2rem] w-[7rem]';
  const [buttonStyle, setButtonStyle] = useState(notInCart);

  const checkIsInCartStyles = (id) => {
    const found = cart.filter((item) => {
      return item.productId === id;
    });
    if (found.length > 0) {
      setButtonStyle(notInCart);
    } else {
      setButtonStyle(inCart);
    }
  };
  useEffect(() => {
    dispatch(getCart());
  }, [isAdded]);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    const id = findInArrayWishList(cart, pId);
    if (id) {
      setButtonStyle(inCart);
    }
  }, [cart]);

  const handleAddToCart = (id) => {
    checkIsInCartStyles(id);
    dispatch(addToCart(id));
  };

  return (
    <div className={`home_category_product_card ${className}`}>
      <section className='category_product_image_container  overflow-hidden'>
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

        <MRating
          sx={{
            margin: "4% 0% 1%",
            fontSize:  "100px" ,
            display: "flex",
            justifyContent: "center",
          }}
          name="half-rating-read"
          value={rating}
          precision={0.5}
          readOnly
        />

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

        {/* ____________- button ________________________________  */}

        <button
          className={`${buttonStyle}`}
          id={pId}
          onClick={() => {
            handleAddToCart(pId);
          }}
        >
          {' '}
          <BsCartPlus />
        </button>

        {isLoading ? (
          <Loading />
        ) : (
          <FontAwesomeIcon
            id='category_wishlist_icon'
            className='hover:scale-105'
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
                    strokeWidth: '3rem',
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
          />
        )}
      </section>
      <div className='add_wishlist_feedback'>
        <p
          className={
            isLoading
              ? 'flex text-[1.2rem] my-2 transition-all duration-100 text-gray-800'
              : 'hidden'
          }
        >
          Adding product to wishlist
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

ProductCard.propTypes = {
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

ProductCard.defaultProps = {
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

export default ProductCard;
