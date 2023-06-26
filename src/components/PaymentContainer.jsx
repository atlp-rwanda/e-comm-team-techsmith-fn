import React, { forwardRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useCreditCardValidator, images } from 'react-creditcard-validator';
import {
  faCircleExclamation,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import Input from './Input';
import Button from './Button';
import {
  usePostOrderPaymentMutation,
  usePostOrderBulkPaymentMutation
} from '../states/api/apiSlice';
import Loading from './Loading';

const PaymentContainer = forwardRef(
  ({ order, ordersCheckout, multiple }, ref) => {
    const { methods, control, handleSubmit } = useForm();

    const expDateValidate = (month, year) => {
      if (Number(year) > 2035) {
        return 'Expiry Date Year cannot be greater than 2035';
      }
      return true;
    };

    const {
      getCardNumberProps,
      getCardImageProps,
      getCVCProps,
      getExpiryDateProps
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

    const [
      postOrderPayment,
      { isLoading, data: paymentData, isSuccess, isError }
    ] = usePostOrderPaymentMutation();

    const [
      orderBulkPayment,
      {
        isLoading: isBulkLoading,
        data: bulkPaymentData,
        isSuccess: isBulkSuccess,
        isError: isBulkError,
      }
    ] = usePostOrderBulkPaymentMutation();

    const onSubmit = (data) => {
      const card = {
        card: {
          number: parseInt(data.number, 10),
          exp_month: parseInt(data.exp_month_year.split('/')[0], 10),
          exp_year: parseInt(data.exp_month_year.split('/')[1], 10),
          cvc: parseInt(data.cvc, 10)
        }
      };
      if (multiple) {
        return orderBulkPayment({
          ordersCheckout,
          card: card.card
        });
      }
      return postOrderPayment({
        orderId: order.id,
        card
      });
    };

    return (
      <div className='payment_information_container w-full flex flex-col gap-8 screen-base:items-center'>
        <h1 className='text-[3rem] font-bold'>Payment information</h1>
        <FormProvider {...methods}>
          <form
            className='payment_details_container flex flex-col gap-6 w-full max-w-[80%] screen-base:max-w-[90%]'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name='number'
              control={control}
              defaultValue='4242424242424242'
              render={({ field: { onChange, value } }) => {
                return (
                  <span className='flex flex-col gap-2 w-full'>
                    <label>CARD NUMBER</label>
                    <span className='relative w-full flex items-center'>
                      <Input
                        className='py-4 px-8 w-full'
                        placeholder='0000 0000 0000 0000'
                        onChange={onChange}
                        {...getCardNumberProps({
                          onChange,
                          value
                        })}
                        ref={ref}
                      />
                      <svg
                        className=' absolute w-fit right-[1rem] bottom-[25%]'
                        {...getCardImageProps({ images })}
                      />
                    </span>
                    <p>For testing, use: 4242424242424242</p>
                  </span>
                );
              }}
            />
            <Controller
              name='name'
              control={control}
              defaultValue={
                multiple ? ordersCheckout?.user?.name : order?.user?.name
              }
              render={({ field }) => {
                return (
                  <span className='flex flex-col gap-2 w-full'>
                    <label>NAME ON CARD</label>
                    <Input
                      className='py-4 px-8 w-full'
                      placeholder={
                        multiple ? ordersCheckout?.user?.name : order?.user?.name
                      }
                      {...field}
                      ref={field.ref}
                    />
                    <p>For testing, use: John Doe</p>
                  </span>
                );
              }}
            />
            <div className='card_expiry_cvv flex items-center w-full gap-8 justify-between'>
              <Controller
                name='exp_month_year'
                control={control}
                defaultValue='11/28'
                render={({ field: { onChange, value } }) => {
                  return (
                    <span className='flex flex-col gap-2 w-full'>
                      <label>VALID UNTIL</label>
                      <Input
                        className='py-4 px-8 w-full'
                        placeholder='12/28'
                        {...getExpiryDateProps({ onChange, value })}
                        ref={ref}
                      />
                      <p>For testing, use: 12/28</p>
                    </span>
                  );
                }}
              />
              <Controller
                name='cvc'
                control={control}
                defaultValue='112'
                render={({ field }) => {
                  return (
                    <span className='flex flex-col gap-2 w-full'>
                      <label>CVC</label>
                      <Input
                        className='py-4 px-8 w-full'
                        placeholder='112'
                        {...field}
                        {...getCVCProps({
                          onChange: field.onChange,
                          value: field.value
                        })}
                        ref={field.ref}
                      />
                      <p>For testing, use: 112</p>
                    </span>
                  );
                }}
              />
            </div>
            <div className='payment_details_cta w-full py-8 px-0 m-0'>
              {isBulkSuccess || isBulkError || isSuccess || isError ? (
                <div className='flex flex-col gap-4 w-full'>
                  <p
                    className={`text-[1.5rem] ${
                      isSuccess || isBulkSuccess
                        ? 'text-green-700'
                        : 'text-red-600'
                    } text-center`}
                  >
                    {isSuccess || isBulkSuccess || isBulkError
                      ? isSuccess ? `You have successfully paid for ${order?.product?.name}. Get your receipt below.`
                      : isBulkSuccess
                      ? `You have successfully paid for ${ordersCheckout?.ids?.length} orders. Get your receipt below.`
                      : 'An error occurred while processing your payment. Please double check your information and try again.'
                      :   'An error occurred while processing your payment. Please double check your information and try again.'}
                  </p>
                  <Button
                    value={
                      isBulkSuccess || isSuccess ? (
                        <span className='flex items-center gap-4'>
                          <FontAwesomeIcon
                            icon={faDownload}
                            className='text-[1.5rem]'
                          />
                          Get receipt
                        </span>
                      ) : (
                        <span className='flex items-center gap-4'>
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className='text-[1.5rem]'
                          />
                          Try again
                        </span>
                      )
                    }
                    className='primary-btn w-fit mx-auto normal-case max-w-full bg-primary'
                    route={
                      multiple && isBulkSuccess
                        ? bulkPaymentData.data.receiptUrl || '#'
                        : isSuccess
                        ? paymentData.data.receiptUrl
                        : '#'
                    }
                    target
                    onClick={() => {
                      if (isError) {
                        window.location.reload();
                      }
                    }}
                  />
                </div>
              ) : (
                <Controller
                  name='submit'
                  control={control}
                  defaultValue=''
                  render={() => {
                    return (
                      <Button
                        input
                        value={
                          <span className='text-[1.5rem] flex items-center gap-4'>
                            {isLoading || isBulkLoading ? (
                              <Loading />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                className='text-3xl'
                              />
                            )}
                            Pay{' '}
                            {multiple ? ordersCheckout?.amount : order.amount}
                          </span>
                        }
                        className='primary-btn w-full normal-case max-w-full bg-primary'
                      />
                    );
                  }}
                />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    );
  }
);

PaymentContainer.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.number,
    productId: PropTypes.number,
    amount: PropTypes.number,
    product: PropTypes.shape({
      name: PropTypes.string
    }),
    user: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  multiple: PropTypes.bool,
  ordersCheckout: PropTypes.shape({
    ids: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    amount: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      telephone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  })
};

export default PaymentContainer;
