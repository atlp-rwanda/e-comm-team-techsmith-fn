import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../Register';

test('renders Register component', () => {
    render(<Register />);
    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();
});

