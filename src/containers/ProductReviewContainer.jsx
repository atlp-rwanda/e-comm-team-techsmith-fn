import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProductReview from '../components/ProductReview';
import { useGetProductReviewsQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';

const ProductReviewContainer = ({ id }) => {
  const {
    data: feedbacks,
    isLoading,
    isError
  } = useGetProductReviewsQuery({ id });

  if (isLoading) {
    return (
      <div className='min-h-[30vh] flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-[30vh] flex items-center justify-center'>
        <h1 className='text-[2rem]'>
          Could not fetch product reviews. Please make sure you are logged in..
        </h1>
      </div>
    );
  }

  if (feedbacks.data.rows.length === 0) {
    return (
      <div className='min-h-[30vh] flex items-center justify-center'>
        <h1 className='text-[2rem]'>
          This product does not have any reviews yet!
        </h1>
      </div>
    );
  }

  return (
    <div className='product_review_container w-10/12 mx-auto flex flex-wrap gap-8 border-primary my-12 screen-mid:justify-evenly'>
      {!isError &&
        feedbacks.data.rows.map((feedback) => {
          const {
            id: feedbackId,
            rating,
            feedback: comment,
            updatedAt,
            user
          } = feedback;
          return (
            <ProductReview
              key={feedbackId}
              rating={rating}
              feedback={comment}
              updatedAt={moment(updatedAt).format('YYYY/MM/DD, HH:mm:ss')}
              user={user}
            />
          );
        })}
    </div>
  );
};

ProductReviewContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ProductReviewContainer;
