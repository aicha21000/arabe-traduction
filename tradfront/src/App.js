// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Auth from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ClientSpaceDashboard from './pages/ClientSpace/Dashboard';
import TranslationRequest from './pages/Translation/Request';
import AdditionalServices from './pages/Services/AdditionalServices';
import Contact from './pages/Contact/Contact';

import ErrorPage from './pages/Error';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/client-space" element={<ClientSpaceDashboard />} />
          <Route path="/translation" element={<TranslationRequest />} />
          <Route path="/services" element={<AdditionalServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
