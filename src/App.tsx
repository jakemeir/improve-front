import React, { useState } from 'react';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './components/UsersPage';

const App: React.FC = () => {

  return (
    <div>
        <Router>
    <Layout>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        {/* Add other routes as needed */}
        <Route path="/" element={<div>IMPROVE PROJECT 2024</div>} />
      </Routes>
    </Layout>
  </Router>
     

    </div>
  );
};

export default App;
