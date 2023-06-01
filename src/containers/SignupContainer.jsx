/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import React ,{useState} from 'react';
import { Typography,Button} from "@mui/material"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TLogo from '../assets/images/T_Logo.png';
import Google from '../assets/images/google.png'
import AuthBlueSide from "../components/AuthBlueSide"
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const SignupContainer = () => {
  const [loading,setLoading]=useState(false)
  const form = useForm()
  const navigate=useNavigate()
  const {register,handleSubmit,formState}=form
  const {errors}=formState
  const mySubmit=async (data)=>{
    setLoading(true)
    await axios
    .post(`https://my-brand-frontend.onrender.com/myapi/login`, data)
    .then((response) => {
      console.log(response.data);
      navigate('/');
      setLoading(false);

    })
    .catch((err) => {
      console.log(err.response.data);
      setLoading(false)
     
    });
  }
  return( 
    <div className='signupPage'>
      <div>
        <div className='signupPage__mobileHeader'>
          <div className='signupPage__imgHeader'>
            <img src={TLogo} alt='' />
          </div>
          <div className='signupPage__signInHeader'>
            <Button variant='contained'>
              Sign in
            </Button>
          </div>
        </div>
      <div className='signupPage__title'>
        <Typography variant='h4'>
          Create your accout hear
        </Typography>
      </div>

      <div className='signupPage__form'>
        <form onSubmit={handleSubmit(mySubmit)} noValidate>
       <div className='first_last_name'>
        <div className='signupPage__input'>
        <input
         type='text'
          id='fname'
           name='fname' required/>
        <label htmlFor='fname'>First name</label>
      </div>
      <div className='signupPage__input'>
      <input
       type='text'
        id='lname'
         name='lname' required/>
      <label htmlFor='lname'>Last name</label>
    </div>
    </div>
        <div className='signupPage__input'>
            <input
             type='text'
              id='email'
               name='email'
                {...register("email",
                {pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message:"Invalid email"
                    },
                    })} required/>
            <label htmlFor='email'>Name@example.com</label>
            <p>{errors.email?.message}</p>
          </div>
          <label className='signupPage_label'>Birthday</label>
          <div className='signupPage__input'>
          <input
           type='date'
            id='birthday'
             name='birthday' required/>
        </div>
        <div className='signupPage__input'>
        <input
         type='text'
          id='address'
           name='address' required/>
        <label htmlFor='address'>Address</label>
      </div>
      <div><label className='signupPage_label'>Gender</label></div>
      <div className='signupPage__input'>
     <div> <select required>
      <option value=''>None</option>
      <option value='male'>Male</option>
      <option value='female'>Female</option>
    </select></div>
    </div>
    <div> <label className='signupPage_label'>Role</label></div>
    <div className='signupPage__input'>
    <div><select required>
    <option value='none'>----</option>
    <option value='admin'>Admin</option>
    <option value='seller'>Seller</option>
    <option value='buyer'>buyer</option>
  </select></div>
  </div>
  <div className='signupPage__input'>
  <input
   type='text'
    id='language'
     name='language' required/>
  <label htmlFor='language'>Language</label>
</div>
  <div className='signupPage__input'>
        <input
         type='text'
          id='address'
           name='address' required/>
        <label htmlFor='address'>Address</label>
      </div>
          <div className='signupPage__input'>
            <input
             type='password'
              id='password'
               name='password'
                {...register("password",
                {required:
                {
                  value:true,
                  message:"Password is required"
                  }})} required/>
            <label htmlFor='password' >Password</label>
            <p>{errors.password?.message}</p>
          </div>
          <div className='signupPage__input'>
          <input
           type='cpassword'
            id='cpassword'
             name='cpassword'
              {...register("cpassword",
              {required:
              {
                value:true,
                message:" Re-enter the password to confirm"
                }})} required/>
          <label htmlFor='password' >Password</label>
          <p className='error'>{errors.password?.message}</p>
        </div>
          <div className='signupPage__forgotcode'>
            <Typography variant='body1'>
              Forgot your password?
            </Typography>
          </div>
          <div className='signupPage__button' >
            <Button type='submit' variant='contained'>
              {loading?<Loading/>:'SUBMIT'}
            </Button>
          </div>
        </form>
      </div>

      <div className='signupPage__googleAuth'>
       <div className='signupPage__googleButton'>
       <div>
            <img src={Google} alt='' />
        </div>
        <div>
            <Typography variant='body2'>
              Sign in with google
            </Typography>
        </div>
       </div>
      </div>
      </div>
      <AuthBlueSide/>
    </div>);
}

export default SignupContainer;
