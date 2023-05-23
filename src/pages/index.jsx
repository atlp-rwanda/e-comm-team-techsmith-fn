import React from 'react';
import AboutContainer from '../containers/AboutContainer';
import CategoryContainer from '../containers/CategoryContainer';
import ContactContainer from '../containers/ContactContainer';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import Notfound from '../containers/NotFound';
import SignupContainer from '../containers/SignupContainer';

function HomePage() {
  return <HomeContainer />;
}
function NotFoundPage() {
  return <Notfound />;
}
function LoginPage() {
  return <LoginContainer />;
}
function SingupPage() {
  return <SignupContainer />;
}
function CategoryPage() {
  return <CategoryContainer />;
}
function AboutPage() {
  return <AboutContainer />;
}
function ContactPage() {
  return <ContactContainer />;
}
export {
  HomePage,
  NotFoundPage,
  LoginPage,
  SingupPage,
  CategoryPage,
  AboutPage,
  ContactPage
};
