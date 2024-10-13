import React from 'react';
import './index.css';
// import { Layout } from 'lucide-react';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import

import UsersPage from './components/UsersPage';

const App: React.FC = () => {
  // Props for update user

  // An example of a user in the list
  const someUserData = {
    firstName: "Dummy",
    lastName: "User",
    email: "dummyuser@example.com",
    phone: "0541234567",
    password: "password123",
    role: "user"
  };

  return (
    <div>
      <Router> {/* Wrap everything inside BrowserRouter */}
        <Layout>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={<div>IMPROVE PROJECT 2024</div>} />
          </Routes>
        </Layout>
      </Router>
      {/* <SearchBox /> */}
      {/* <CreateUser /> */}
    </div>
  );
};

export default App;
