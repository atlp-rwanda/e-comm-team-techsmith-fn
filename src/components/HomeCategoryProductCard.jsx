import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Rating from './Rating';
import Button from './Button';
import { primaryColor } from '../constants';

const HomeCategoryProductCard = ({
  className,
  buttonClassName,
  price,
  name,
  category,
  description,
  image,
  route,
  rating
}) => {
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
        <Button value='Buy now' className={`primary-btn ${buttonClassName}`} />
        <Button
          value={
            <FontAwesomeIcon
              style={{
                height: '100%',
                width: '3rem',
                maxWidth: '3rem',
                fontWeight: 'light',
                color: 'black',

                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
              icon={faHeart}
            />
          }
          style={{
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          className='bg-transparent'
        />
      </section>
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
  category: 'Category'
};

export default HomeCategoryProductCard;
