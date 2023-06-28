import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import Input from '../Input';
import { createMessage } from '../../states/features/chat/chatSlice';

const MessageField = () => {
  const { register } = useForm();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const createMessageHandler = (data) => {
    dispatch(createMessage(data));
    data = '';
  };

  return (
    <form
      className='message_field_container w-full flex items-center gap-4 px-8 py-6'
      onSubmit={(e) => {
        e.preventDefault();
        createMessageHandler(inputRef.current.value);
        inputRef.current.value = '';
      }}
    >
      <Input
        type='text'
        placeholder='Send your message...'
        className='message_field_input w-full h-full flex-grow outline-none px-4 py-2 rounded-[2rem] text-[1.4rem] focus:border-primary'
        {...register('message', { required: 'Please enter a message' })}
        ref={inputRef}
      />
      <Button
        type='submit'
        id='send-message'
        value={
          <FontAwesomeIcon
            icon={faPaperPlane}
            className='text-[1.6rem] w-[1.6rem]'
          />
        }
        className='primary-btn p-6 w-fit bg-primary text-white normal-case rounded-[50%]'
        onClick={() => {
          createMessageHandler(inputRef.current.value);
          inputRef.current.value = '';
        }}
      />
    </form>
  );
};

export { MessageField };
