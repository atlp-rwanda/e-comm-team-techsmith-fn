import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import Button from '../components/Button';


test('should render a button', () => {
    renderWithRedux(
        <Button
            className='primary-btn create_user_btn'
            value='+  Add user'
            route='/'
            onClick={(e) => {}}
          />
    )

    const button = screen.queryAllByRole('button');

    expect(button).toBeTruthy();
})