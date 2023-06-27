import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';
import { ChangePassword } from '../components/changePassword';

describe("Change password page",()=>{

      test('Testing the change password',async () => {
        renderWithRedux( <ChangePassword />);
      
          const myHeading= screen.queryAllByRole('heading',{level:5})
          const myForm= screen.queryAllByRole('form')
          const myInputs= screen.queryAllByRole('textbox')
      
          // Assertions
          expect(myHeading).toBeTruthy();
          expect(myInputs).toBeTruthy();
          expect(myForm).toBeTruthy();
      }); 
})