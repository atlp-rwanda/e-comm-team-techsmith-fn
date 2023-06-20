import React from 'react';
import { useParams } from 'react-router-dom';
import AboutContainer from '../containers/AboutContainer';
import ContactContainer from '../containers/ContactContainer';
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import Notfound from '../containers/NotFound';
import SellerContainer from '../containers/SellerContainer';
import SignupContainer from '../containers/SignupContainer';
import SingleProductContainer from '../containers/SingleProductContainer';
import ProductReviewForm from '../containers/ProductReviewForm';
import ProductReviewContainer from '../containers/ProductReviewContainer';
import AdminManageUserContainer from '../containers/UsersContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SearchContainer from '../containers/SearchContainer';
import ChatContainer from '../containers/ChatContainer';
import ResetPasswordContainer from '../containers/ResetPasswordContainer';
import SellerProductsContainer from '../containers/SellerProductsContainer';
import ViewAllProductsContainer from '../containers/ViewAllProductsContainer';

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
  return <ViewAllProductsContainer />;
};
const AboutPage = () => {
  return <AboutContainer />;
};
const ContactPage = () => {
  return <ContactContainer />;
};
const ProfilePage = () => {
  return <ProfileContainer />;
};
const SellerPage = () => {
  return <SellerContainer />;
};
const SearchPage = () => {
  return <SearchContainer />;
};
const ChatPage = () => {
  return <ChatContainer />;
};

const ResetPasswordPage =()=>{
  return <ResetPasswordContainer />
}

const SingleProductPage = () => {
  const { id } = useParams();

  return (
    <>
      <SingleProductContainer id={Number(id)} />
      <ProductReviewForm id={Number(id)} />
      <ProductReviewContainer id={Number(id)} />
    </>
  );
};
const AdminManageUserPage = () => {
  return <AdminManageUserContainer />;
};

const SellerProductsPage = () => {
  return <SellerProductsContainer />;
};
export {
  HomePage,
  NotFoundPage,
  LoginPage,
  SingupPage,
  CategoryPage,
  AboutPage,
  ContactPage,
  SingleProductPage,
  SellerPage,
  ProfilePage,
  SearchPage,
  ChatPage,
  ResetPasswordPage,
  AdminManageUserPage,
  SellerProductsPage
};
