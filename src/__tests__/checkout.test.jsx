import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';
import CheckoutContainer from '../containers/CheckoutContainer';
import ShippingDetails from '../components/ShippingDetails';
import PaymentContainer from '../components/PaymentContainer';
import MultipleOrdersContainer from '../containers/MultipleOrdersContainer';
import OrderDetails from '../components/OrderDetails';
import Loading from '../components/Loading';
import { orderDetails, ordersToPay } from './data/order';
import Pagination from '../components/Pagination';

describe('Checkout Container', () => {

    test('renders Checkout Container component', async () => {
        renderWithRedux(<PaymentContainer order={orderDetails} />);
        renderWithRedux(<Loading />);
        renderWithRedux(<CheckoutContainer id={551} />);
        renderWithRedux(<ShippingDetails order={orderDetails} />);
        renderWithRedux(<OrderDetails order={orderDetails} checkoutPage={true} />);
        const buttons = await screen.findAllByRole('link' || 'button');
        const button = await screen.findAllByRole('link');
        const images = await screen.findAllByRole('img');
        const headings = await screen.findAllByRole('heading');

        await userEvent.click(button[0]);
        const texts = screen.queryAllByRole('note');
    
        expect(buttons).toBeTruthy();
        expect(headings).toBeTruthy();
        expect(images).toBeTruthy();
        expect(texts).toBeTruthy();
        expect(texts).toBeTruthy();
    });
    test('renders Multiple Orders Checkout Container component', async() => {
        renderWithRedux(<PaymentContainer multiple ordersCheckout={ordersToPay} />);
        renderWithRedux(<Loading />);
        renderWithRedux(<MultipleOrdersContainer />)
        renderWithRedux(<ShippingDetails order={orderDetails} />)
        renderWithRedux(<OrderDetails order={orderDetails} checkoutPage={false} />);
        renderWithRedux(<Pagination totalPages={5} />);
        const buttons = await screen.findAllByRole('link' || 'button');
        const images = await screen.findAllByRole('img');
        const headings = await screen.findAllByRole('heading');
        const texts = screen.queryAllByRole('paragraph');
    
        expect(buttons).toBeTruthy();
        expect(headings).toBeTruthy();
        expect(images).toBeTruthy();
        expect(texts).toBeTruthy();
        expect(texts).toBeTruthy();
    });
});