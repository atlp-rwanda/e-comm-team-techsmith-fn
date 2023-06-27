import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter,useLocation,useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthBlueSide from '../components/AuthBlueSide';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../states/features/auth/authSlice';


describe("Testing auth blueside page",()=>{
    let store;
    beforeEach(() => {
        store = configureStore({
          reducer: {
            auth: (state = { isLoading: false, isError: false, isSuccess: false, changePassword: false }) => state,
          },
        });
      });
    test('Authblueside page props', () => {
        render(
         <Provider store={store}>
            <BrowserRouter>
                 <AuthBlueSide button='SIGN UP' heading='Create Your Accounts' description='hello there create your account'/>
            </BrowserRouter>
         </Provider>
          );
      
          // Assertions
          expect(screen.getByRole('button',{value:'SIGN UP'})).toBeInTheDocument();
          expect(screen.getByRole('heading',{value:'Create Your Account'})).toBeInTheDocument();
          expect(screen.getByText('hello there create your account')).toBeInTheDocument();
    }); 
})