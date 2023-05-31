import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Rating from './Rating';

const HomePopularProductCard = ({
  image,
  name,
  price,
  description,
  rating,
  category
}) => {
  const addToWishlist = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Add to wishlist');
  };
  return (
    <section className='home_popular_product_card'>
      <div className='popular_card_image'>
        <img src={image} alt='Popular product' />
      </div>
      <div className='product_name_price'>
        <h4>{name}</h4>
        <p>{price}</p>
      </div>
      <div className='product_description_ratings_category'>
        <p id='popular_product_description'>{description}</p>
        <span>
          <Rating
            rating={rating.rating}
            count={rating.count}
            id='home-star-rating'
          />
        </span>
        <Button className='home_product_category' value={category} />
      </div>
      <div>
        <Button
          value='Add to wishlist'
          onClick={addToWishlist}
          className='primary-btn home_popular_product_card_button'
        />
      </div>
    </section>
  );
};

HomePopularProductCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
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
  category: PropTypes.string
};

HomePopularProductCard.defaultProps = {
  image:
    'https://res.cloudinary.com/nishimweprince/image/upload/v1685095429/ecommerce/iphone_se_hero__gd586pazxqqa_medium_2x_vcu3nz.jpg',
  description: 'Brand new iPhone 14 Plus, 256GB',
  rating: {
    rating: 4,
    count: 5
  },
  price: '$1499',
  name: 'iPhone 14 Pro',
  category: 'Electronics'
};

export default HomePopularProductCard;
