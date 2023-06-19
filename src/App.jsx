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
  SingleProductPage,
  SingupPage,
  SearchPage,
  WishlistPage
  
} from './pages';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import JoinChat from './components/Chatroom/JoinChat';
import Navigate from './outlets/Navigate';
import ProtectedRoutes from './outlets/ProtectedRoutes';
import SellerRoutes from './outlets/SellerRoutes';
import SellerNavigation from './outlets/SellerNavigation';
import ChatFloadtingButton from './components/Chatroom/ChatFloatingButton';

const App = () => {
  
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SingupPage />} />
          <Route element={<SellerRoutes />}>
            <Route path='/seller/add-product' element={<SellerPage />} />
          </Route>
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route path='/users/:id' element={<ProfilePage />} />
          <Route path='/dashboard/users' element={<AdminManageUserPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/chat' element={<JoinChat />} />
            <Route path='/chat/room' element={<ChatPage />} />
          </Route>
          <Route path='/unauthorized' element={<Navigate />} />
          <Route path='/seller/unauthorized' element={<SellerNavigation />} />
          
          <Route path='/wishlist' element={<WishlistPage />} />
          
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <div style={{ position: 'fixed', bottom: '4rem', right: '4rem' }}>
          <ChatFloadtingButton />
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

library.add(fab, fas, far);
