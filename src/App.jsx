import React, { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getProducts } from "./states/features/products/actions"
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { AboutPage, CategoryPage, ContactPage, HomePage, LoginPage, NotFoundPage, SingupPage } from './pages';
function App() {
  const products = useSelector(state => state.products)
const dispatch = useDispatch()
console.log(products)

useEffect(()=>{
dispatch(getProducts())
},[dispatch])


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/category" element={<CategoryPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SingupPage/>}/>

        </Routes>
      </Router>
    </div>
    



  )
}
export default App