import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { primaryColor } from '../constants';
import Button from './Button';

const HomeTopSeller = ({
  name,
  image,
  rating,
  categories,
  buttonClassName,
  className
}) => {
  return (
    <div className={className}>
      <section className='home_seller_image_container'>
        <img src={image} alt={name} />
      </section>
      <p className='home_seller_name'>{name}</p>
      <section className='home_seller_rating'>
        <Rating rating={rating.rating} performrating={rating.performRating} />
      </section>
      <section className='home_seller_categories'>
        {categories.map((category) => {
          return (
            <Button
              key={category}
              value={category}
              className='home_seller_category'
              route='#'
            />
          );
        })}
      </section>
      <section className='home_seller_cta'>
        <Button
          value='Check them out'
          className={`primary-btn ${buttonClassName}`}
        />
      </section>
    </div>
  );
};

HomeTopSeller.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  rating: PropTypes.shape({
    rating: PropTypes.number,
    count: PropTypes.number,
    className: PropTypes.string,
    performRating: PropTypes.bool,
    color: PropTypes.shape({
      filled: PropTypes.string,
      unfilled: PropTypes.string
    })
  }),
  categories: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
  className: PropTypes.string
};

HomeTopSeller.defaultProps = {
  image:
    'https://res.cloudinary.com/nishimweprince/image/upload/v1685234037/ecommerce/professional-30-1024_yz5xqf.png',
  rating: {
    rating: 4,
    count: 5,
    color: {
      filled: primaryColor,
      unfilled: '#DCDCDC'
    },
    performRating: false
  },
  categories: ['Electronics', 'Fashion', 'Sports'],
  buttonClassName: 'home_seller_cta_button',
  className: 'home_top_seller'
};

export default HomeTopSeller;
