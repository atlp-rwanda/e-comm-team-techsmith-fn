import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import SellerContainer from '../containers/SellerContainer';

describe('Testing ManageProduct component', () => {
  test('renders all input fields and button', () => {
    renderWithRedux(<SellerContainer />);

    expect(screen.getByText('Manage product')).toBeInTheDocument();
    expect(screen.getByText('Names')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price per product')).toBeInTheDocument();
    expect(screen.getByText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Upload images')).toBeInTheDocument();
   
  });

  
  

  

  // Additional test cases can be added to cover form validation, input values, etc.
});
