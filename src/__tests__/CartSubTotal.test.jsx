import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import { cart } from './data/cart';
import { SubTotal } from '../components/Cart';

test('Render subTotal component', () => {

    renderWithRedux(
        <SubTotal
        cart={cart}
        sum={3000}
        />
    )

    const title = screen.getByText(/Cart Subtotal/i);
    const subHeading = screen.queryAllByRole('heading',{level: 3});
    const table = screen.queryByRole('table');
    const product = screen.getByRole('columnheader',{name: /Product/i})  
    const price = screen.getByRole('columnheader',{name: /Price/i});
    const button = screen.getByRole('button',{name: /Proceed To Order/i});

    expect(title).toBeInTheDocument();  
    expect(subHeading.length).toBe(2);
    expect(table).toBeTruthy();
    expect(button).toBeTruthy();
    expect(product).toBeInTheDocument();
    expect(price).toBeInTheDocument();
})
