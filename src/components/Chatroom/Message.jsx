import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import Input from '../Input';
import { createMessage } from '../../states/features/chat/chatSlice';

const MessageField = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm();
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const onSubmit = (data) => {
    dispatch(createMessage(data.message));
    inputRef.current.value = '';
    reset();
  };

  return (
    <form
      className='message_field_container w-full flex h-full items-center gap-4 px-8 py-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='message'
        control={control}
        rules={{ required: 'Please enter a message.' }}
        render={({ field }) => {
          return (
            <Input
              type='text'
              placeholder={
                errors?.message
                  ? 'Message is required'
                  : 'Type your message here...'
              }
              className={`message_field_input w-full h-full flex-grow outline-none px-4 py-2 rounded-[2rem] text-[1.4rem] ${
                errors?.message
                  ? 'border-2 border-red-800 focus:border-red-700 dark:border-red-300'
                  : 'border-1px focus:border-primary'
              }`}
              onChange={field.onChange}
              value={field.value}
              ref={inputRef}
            />
          );
        }}
      />
      <Controller
      name='submit'
      control={control}
      render={() => {
        return (
          <Button
            type='submit'
            input
            className='primary-btn p-6 w-fit bg-primary text-white normal-case rounded-[50%]'
            value={
              <FontAwesomeIcon
                className='text-[1.4rem] text-white w-6 h-6'
                icon={faPaperPlane}
              />
            }
          />
        );
      }}
      />
    </form>
  );
};

export { MessageField };
