import React from 'react';
import { render, screen } from '@testing-library/react';
import ForgetPassword from '../components/ForgetPassword';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';

test('Testing the forget password', () => {
  renderWithRedux(<ForgetPassword />);
  const myHeading = screen.queryByRole('heading', { level: 4 });
  const myParagraph = screen.queryAllByRole('paragraph');
  const myForm = screen.queryAllByRole('form');
  const myLabel = screen.queryAllByRole('Email');
  const myInput = screen.queryByRole('textbox');
  const myButton = screen.queryAllByRole('buton', { type: 'submit' });

  // Assertions
  expect(myHeading).toBeTruthy();
  expect(myParagraph).toBeTruthy();
  expect(myForm).toBeTruthy();
  expect(myLabel).toBeTruthy();
  expect(myInput).toBeTruthy();
  expect(myButton).toBeTruthy();
});
