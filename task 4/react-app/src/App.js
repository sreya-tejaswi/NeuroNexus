import AppNavbar from './components/AppNavbar';
import ProductView from './components/ProductView';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AdminDashboard from './pages/AdminDashboard';
import ProductCreate from './pages/ProductCreate';
import ProductUpdate from './pages/ProductUpdate';
import AdminProductView from './pages/AdminProductView';
import './App.css';


import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';




export default function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  });

  console.log(user);

  const unsetUser = () => {
    localStorage.clear();
  };



useEffect(() => {
    //fetch('http://localhost:4000/users/details', {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(typeof data._id !== 'undefined'){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, [])



  return (


    <>
    <UserProvider value={{ user, setUser, unsetUser }} >
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products-create" element={<ProductCreate />} />
            <Route path="/admin/products-view" element={<AdminProductView />} />
            <Route path="/products/:productId/update" element={<ProductUpdate />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    </>



  );
}

