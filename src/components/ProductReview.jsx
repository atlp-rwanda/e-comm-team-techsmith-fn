import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Rating from './Rating';

const ProductReview = ({ rating, updatedAt, feedback, user }) => {
  return (
    <div
      className='product_review_single flex flex-col w-full basis-1/5 p-8 gap-6 border-[.1rem] rounded-[.5rem] screen-lg:min-w-[1/4]'
      style={{
        boxShadow: '0 0 1rem rgba(0,0,0,.1)'
      }}
    >
      <section className='product_review_user_rating w-full flex justify-between'>
        <div className='product_review_user flex gap-4 items-center text-base'>
          <FontAwesomeIcon icon={faUser} />
          {user.name}
        </div>
        <Rating rating={rating} />
      </section>
      <div className='product_review_feedback'>
        <p className='product_feedback_text'>{feedback}</p>
      </div>
      <div className='product_review_date'>
        <p className='product_review_date_text'>{updatedAt}</p>
      </div>
    </div>
  );
};

ProductReview.propTypes = {
  rating: PropTypes.number.isRequired,
  updatedAt: PropTypes.string.isRequired,
  feedback: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default ProductReview;
