import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
  AboutPage,
  AdminManageUserPage,
  CategoryPage,
  ChatPage,
  ContactPage,
  HomePage,
  LoginPage,
  SellerPage,
  ProfilePage,
  NotFoundPage,
  ResetPasswordPage,
  SingleProductPage,
  SingupPage,
  SearchPage,
  SellerProductsPage,
  CheckoutPage,
  WishlistPage,
  MultipleCheckoutPage,
  SingleSellerContainer
} from './pages';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Navigate from './outlets/Navigate';
import ProtectedRoutes from './outlets/ProtectedRoutes';
import SellerRoutes from './outlets/SellerRoutes';
import SellerNavigation from './outlets/SellerNavigation';
import ChatFloadtingButton from './components/Chatroom/ChatFloatingButton';
import AdminNavigation from './outlets/AdminNavigation';
import AdminRoutes from './outlets/AdminRoutes';
import IsLoggedIn from './outlets/IsLoggedIn';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Cart />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route element={<IsLoggedIn />}>
            <Route path='/login' element={<LoginPage />} />
          </Route>
          <Route path='/signup' element={<SingupPage />} />
          <Route
            path='/reset-password/:token'
            element={<ResetPasswordPage />}
          />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/unauthorized' element={<Navigate />} />
          <Route path='/seller/unauthorized' element={<SellerNavigation />} />
          <Route path='/admin/unauthorized' element={<AdminNavigation />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/orders' element={<MultipleCheckoutPage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/order/:id' element={<CheckoutPage />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/users/:id' element={<ProfilePage />} />
          </Route>
          <Route element={<SellerRoutes />}>
            <Route path='/seller/add-product' element={<SellerPage />} />
            <Route path='/dashboard/seller' element={<SellerProductsPage />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path='/dashboard/users' element={<AdminManageUserPage />} />
          </Route>
          <Route path='/unauthorized' element={<Navigate />} />
          <Route path='/seller/unauthorized' element={<SellerNavigation />} />
          <Route path='/seller/:id' element={<SingleSellerContainer />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <div
          className='screen-base:right-6'
          style={{ position: 'fixed', bottom: '4rem', right: '4rem' }}
        >
          <ChatFloadtingButton />
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

library.add(fab, fas, far);
