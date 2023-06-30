import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import { singleProduct } from './data/products';
import SingleProductCart from '../components/SingleProductCart';


test('renders Register component', async () => {
    renderWithRedux(
        <SingleProductCart
                      name={singleProduct.name}
                      key={singleProduct.name}
                      image={singleProduct.image[0]}
                      prodId={singleProduct.productId}
                      quantity={1}
                      details='Get this quality product by from your fingertip. Order it now.'
                      piecePrice='USD 122.00'
        />
    )

    const details = screen.getByText(/Get this quality product by from your fingertip. Order it now./i);
    const buttons = screen.getAllByRole('button');
    const image = screen.queryByRole('img');

    expect(details).toBeInTheDocument();
    expect(buttons.length).toBe(3);
    expect(buttons).toBeTruthy();
    expect(image).toBeTruthy();
   
});

