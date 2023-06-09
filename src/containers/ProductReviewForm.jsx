import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { usePostProductReviewMutation } from '../states/api/apiSlice';
import Rating from '../components/Rating';
import Button from '../components/Button';

const ProductReviewForm = ({ id }) => {
  const token = `token=${localStorage.getItem('myToken')}`;

  const [postProductReview, { isLoading, isError, isSuccess }] =
    usePostProductReviewMutation();

  const { register, handleSubmit } = useForm();

  const [rating, setRating] = useState(0);
  let review = {};

  const onSubmit = (data) => {
    review = {
      feedback: data.comment,
      rating
    };
    postProductReview({ id, review, token })
      .unwrap()
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(() => {});
  };

  const inputsClassName =
    `review_input w-11/12 px-8 py-4 text-base outline-none rounded-[.5rem] ${isError ? 'border-red-700': 'none'}`;
  const inputsContainerClassName =
    'review_input_container flex flex-col justify-center text-base gap-4 items-start w-full mx-auto screen-mid:items-center';

  return (
    <section className='product_review flex flex-col items-center my-16 gap-10 w-2/4 m-auto screen-lg:w-2/3 screen-mid:3/4'>
      <h3 className='text-[2.5rem] font-medium'>
        Share us your experience. Your reviews help us improve!
      </h3>
      <div className='product_review_form_container w-full'>
        <form
          className='product_review_form w-full flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className='grid grid-cols-2 gap-12 w-full justify-between screen-base:grid-cols-1 gap-8'>
            <label htmlFor='review_title' className={inputsContainerClassName}>
              Name
              <input
                type='text'
                name='name'
                className={inputsClassName}
                placeholder='Name'
                {...register('name', { required: true })}
              />
            </label>
            <label htmlFor='review_title' className={inputsContainerClassName}>
              Email
              <input
                type='email'
                name='email'
                className={inputsClassName}
                placeholder='Email'
                {...register('email', { required: true })}
              />
            </label>
            <label htmlFor='review_title' className={inputsContainerClassName}>
              Comment
              <textarea
                name='comment'
                className={`${inputsClassName} h-[10rem]`}
                placeholder='Comment'
                {...register('comment', { required: true })}
              />
            </label>
            <label
              htmlFor='review_title'
              className={`${inputsContainerClassName} items-center text-base gap-6`}
            >
              Add rating
              <Rating
                performrating
                rating={rating}
                onRating={(rate) => {
                  return setRating(rate);
                }}
              />
            </label>
          </span>
          <p className='text-base text-red-800 align-middle text-center my-4 hidden' style={
            isError ? {display: 'block'} : {display: 'none'}
          } id='product_review_error'>Could not add your review. We only allow users who have purchased the product to share feedback to prevent spam.</p>
          <p className='text-base text-green-600 text-center my-4 hidden' style={
            isSuccess ? {display: 'block'} : {display: 'none'}
          } id='product_review_success'>Your review has been submitted successfully</p>
          <Button
            value={
              isLoading ? (
                <span className='text-base flex gap-2'>
                  <svg
                    aria-hidden='true'
                    className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>{' '}
                  Sending{' '}
                </span>
              ) : (
                'Share'
              )
            }
            type='submit'
            className={`primary-btn product_review_button px-8 py-3 m-4 w-fit text-base normal-case mx-auto  ${isSuccess ? 'bg-green-600':'bg-primary'}`}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </section>
  );
};

ProductReviewForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ProductReviewForm;
