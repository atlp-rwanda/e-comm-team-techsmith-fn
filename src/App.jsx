import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import getProducts from './states/features/products/actions';
import {
  AboutPage,
  CategoryPage,
  ContactPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  SingupPage
} from './pages';

function App() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SingupPage />} />
          <Route path='/none' element={<div>please call</div>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
