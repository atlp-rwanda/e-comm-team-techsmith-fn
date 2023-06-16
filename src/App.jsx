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
  ContactPage,
  HomePage,
  LoginPage,
  SellerPage,
  ProfilePage,
  NotFoundPage,
  SingleProductPage,
  SingupPage
} from './pages';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

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
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SingupPage />} />
          <Route path='/seller/add-product' element={<SellerPage />} />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/users/:id' element={<ProfilePage />} />
          <Route path='/dashboard/users' element={<AdminManageUserPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
export default App;

library.add(fab, fas, far);
