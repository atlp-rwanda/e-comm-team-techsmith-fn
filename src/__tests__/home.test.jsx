import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import HomeContainer from '../containers/HomeContainer';
import ProductCard from '../components/ProductCard';
import { singleProduct } from './products';
import BrowseByCategory from '../containers/HomeBrowseCategory';

describe('Home Container', () => {
    test('Renders home container', async () => {
        renderWithRedux(
            <>
            <HomeContainer />
            <BrowseByCategory />
            <ProductCard
            image={singleProduct.image[0]}
            name={singleProduct.name}
            price={singleProduct.price}
            quantity={singleProduct.quantity}
            pId={singleProduct.id}
            category={singleProduct.categories.name}
            description={singleProduct.description}
            />
            </>
        );

        const headings = screen.queryAllByRole('heading');
        const images = screen.queryAllByRole('img');
        const buttons = screen.queryAllByRole('link' || 'button');

        expect(buttons).toBeTruthy();
        expect(headings).toBeTruthy();
        expect(images).toBeTruthy();
    });
});