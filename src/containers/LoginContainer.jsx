/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import React ,{useState} from 'react';
import { Typography,Button} from "@mui/material"
import { useForm } from 'react-hook-form';
import Google from '../assets/images/google.png'
import AuthBlueSide from "../components/AuthBlueSide"
import TLogo from '../assets/images/T_Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const LoginContainer = () => {
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
  return (
    <div className='loginPage'>
      <div>
        <div className='loginPage__mobileHeader'>
          <div className='loginPage__imgHeader'>
            <img src={TLogo} alt='' />
          </div>
          <div className='loginPage__signInHeader'>
            <Button variant='contained'>
              Sign up
            </Button>
          </div>
        </div>
      <div className='loginPage__title'>
        <Typography variant='h4'>
          Sign In
        </Typography>
      </div>

      <div className='loginPage__form'>
        <form onSubmit={handleSubmit(mySubmit)} noValidate>
          <div className='loginPage__input'>
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
            <label htmlFor='email'>Email</label>
            <p>{errors.email?.message}</p>
          </div>
          <div className='loginPage__input'>
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
          <div className='loginPage__forgotcode'>
            <Typography variant='body1'>
              Forgot your password?
            </Typography>
          </div>
          <div className='loginPage__button' >
            <Button type='submit' variant='contained'>
              {loading?<Loading/>:'SIGN IN'}
            </Button>
          </div>
        </form>
      </div>

      <div className='loginPage__googleAuth'>
       <div className='loginPage__googleButton'>
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
    </div>
  )


    

  }
 


export default LoginContainer