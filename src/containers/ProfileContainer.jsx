import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { successNotification } from '../components/Notification';
import Button from '../components/Button';
import { userInfo, updateUser } from '../states/features/users/usersSlice';
import Loading from '../components/Loading';

const ProfileContainer = () => {
  const form = useForm();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = form;
  const { isSuccess, isLoading, isError, message } = useSelector((state) => {
    return state.users;
  });
  const {
    name,
    gender,
    preferredLanguage,
    physicalAddress,
    preferredCurrency
  } = message;

  useEffect(() => {
    dispatch(userInfo());
    editValues();
  }, [dispatch, isSuccess, isError]);

  const editValues = () => {
    setValue('name', name);
    setValue('gender', gender);
    setValue('preferredLanguage', preferredLanguage);
    setValue('physicalAddress', physicalAddress);
    setValue('preferredCurrency', preferredCurrency);
  };
  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    editValues();
  };

  const handleSave = async (data) => {
    dispatch(updateUser(data));
    await setEditing(false);
    successNotification('Successfully updated!');
  };

  return (
    <div className='myprofile flex justify-center items-center mt-48 mb-24 '>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className='myprofile__header flex px-4 py-3 justify-between items-center'>
          <div className='myprofile__headerTitle'>
            <p>MY PROFILE</p>
          </div>
          <div>
            {!editing ? (
              <Button value='EDIT' onClick={handleEdit} />
            ) : (
              <div className='flex'>
                <Button
                  value='Cancel'
                  className='myprofile__cancelBtn'
                  onClick={handleCancel}
                />
                <button
                  className='myprofile__updBtn'
                  type='submit'
                  value='Save'
                >
                  <p>Save</p>
                </button>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='myprofile__information '>
            <div className='myProfile__formsection px-4 py-3'>
              <div className='flex myprofilee__formsection_input items-center'>
                <label htmlFor='name'>Username</label>
                <div>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    {...register('name')}
                    defaultValue={name}
                    disabled={!editing}
                    required
                  />
                </div>
              </div>

              <div className='flex myprofilee__formsection_input items-center'>
                <label htmlFor='gender'>Gender</label>
                <div>
                  <div className=''>
                    <select
                      id='gender'
                      name='gender'
                      {...register('gender')}
                      defaultValue={gender}
                      disabled={!editing}
                    >
                      <option value=''>None</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='flex myprofilee__formsection_input items-center'>
                <label htmlFor='preferredLanguage'>PreferredLanguage</label>
                <div className=''>
                  <select
                    id='preferredLanguage'
                    name='preferredLanguage'
                    {...register('preferredLanguage')}
                    defaultValue={preferredLanguage}
                    disabled={!editing}
                  >
                    <option value=''>None</option>
                    <option value='english'>English</option>
                    <option value='french'>French</option>
                  </select>
                </div>
              </div>

              <div className='flex myprofilee__formsection_input items-center'>
                <label htmlFor='physicalAddress'>Physical Address</label>
                <div>
                  <input
                    type='text'
                    id='physicalAddress'
                    name='physicalAddress'
                    {...register('physicalAddress')}
                    defaultValue={physicalAddress}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className='flex myprofilee__formsection_input items-center'>
                <label htmlFor='preferredCurrency'>Preferred currency</label>
                <div>
                  <select
                    id='preferredCurrency'
                    name='preferredCurrency'
                    {...register('preferredCurrency')}
                    defaultValue={preferredCurrency}
                    disabled={!editing}
                  >
                    <option value=''>None</option>
                    <option value='RWF'>RWF</option>
                    <option value='USD'>USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
      {isSuccess && <ToastContainer />}
    </div>
  );
};

export default ProfileContainer;
