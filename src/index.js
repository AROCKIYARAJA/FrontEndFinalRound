import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateAccount from './CreateAccount.js';
import PostCreateForm from './PostCreateForm.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/CreateAccount' element={<CreateAccount />} />
      <Route path='/PostCreateForm' element={<PostCreateForm />} />
    </Routes>
  </BrowserRouter>
);