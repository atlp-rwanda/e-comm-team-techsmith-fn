import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginContainer from '../containers/LoginContainer';
import InputPopup from '../components/InputPopup';
import ForgetPassword from '../components/ForgetPassword';
import PopupMaker from '../components/PopupMaker';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';


describe("Testing login page",()=>{

    test('Login page labels', () => {
          renderWithRedux(<LoginContainer />);
          // Assertions
          expect(screen.getByLabelText('Email')).toBeInTheDocument();
          expect(screen.getByLabelText('Password')).toBeInTheDocument();
          expect(screen.queryAllByRole('alert')).toBeTruthy();
          expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    });  
    test('Testing the pop up maker', () => {
      renderWithRedux(
      <PopupMaker  
        open={true}
        Component={ForgetPassword}
        setOpen={false}
      />);
  
        const allParagraph= screen.queryAllByRole('paragraph')
        const allButtons= screen.queryAllByRole('button')
        const myForm= screen.queryAllByRole('form')
    
        // Assertions
        expect(allParagraph).toBeTruthy();
        expect(allButtons).toBeTruthy();
        expect(myForm).toBeTruthy();
  });
  test('Testing the input pop up', () => {
    renderWithRedux(
      <InputPopup  
      title='2FA Verification'
 details='Please check your email for the token to complete the Two-Factor
         Authentication process.'
 inputError='Please Enter Token'
 button='Verify'
 placeholder='Enter Token'/>
     );
      const allParagraph= screen.queryAllByRole('paragraph')
      const allButtons= screen.queryAllByRole('button')
      const myForm= screen.queryAllByRole('form')
  
      // Assertions
      expect(allParagraph).toBeTruthy();
      expect(allButtons).toBeTruthy();
      expect(myForm).toBeTruthy();
});

})