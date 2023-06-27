import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../states/store';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </Router>
    );
  });

  it('renders the logo', () => {
    const logoElement = screen.getByAltText('Techmisth large logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the navigation links', () => {
    const categoriesLink = screen.getByText('Categories');
    const contactLink = screen.getByText('Contact us');
    const aboutLink = screen.getByText('About us');
 
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(categoriesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });


  it('Navbar renders the sign up button when not logged in', () => {
    const loginButton = screen.getByRole('link', { name: 'Login' });
    const signUpButton = screen.getByRole('link', { name: 'Sign up' });
    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });


  // Add more tests as needed
});
