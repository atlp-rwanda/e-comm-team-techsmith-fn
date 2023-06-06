import React from 'react';
import AboutContainer from '../containers/AboutContainer';
import CategoryContainer from '../containers/CategoryContainer';
import ContactContainer from '../containers/ContactContainer';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import Notfound from '../containers/NotFound';
import SignupContainer from '../containers/SignupContainer';

const HomePage = () => {
  return <HomeContainer />;
};
const NotFoundPage = () => {
  return <Notfound />;
};
const LoginPage = () => {
  return <LoginContainer />;
};
const SingupPage = () => {
  return <SignupContainer />;
};
const CategoryPage = () => {
  return <CategoryContainer />;
};
const AboutPage = () => {
  return <AboutContainer />;
};
const ContactPage = () => {
  return <ContactContainer />;
};

export {
  HomePage,
  NotFoundPage,
  LoginPage,
  SingupPage,
  CategoryPage,
  AboutPage,
  ContactPage
};
