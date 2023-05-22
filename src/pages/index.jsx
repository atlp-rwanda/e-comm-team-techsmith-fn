import React from 'react';
import AboutContainer from '../containers/aboutContainer';
import CategoryContainer from '../containers/categoryContainer';
import ContactContainer from '../containers/contactContainer';
import HomeContainer from '../containers/homeContainer';
import LoginContainer from '../containers/loginContainer';
import Notfound from '../containers/notFound';
import SignupContainer from '../containers/signupContainer';

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
