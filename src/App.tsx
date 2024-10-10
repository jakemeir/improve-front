import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import './index.css';
// import { Layout } from 'lucide-react';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import SearchBox from './components/SearchBox';
import UsersPage from './components/UsersPage';

const App: React.FC = () => {
  // Props for update user
  const [isModelOpen, setModelOpen] = useState(false);

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
