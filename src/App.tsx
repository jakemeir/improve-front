import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import './index.css'
import SearchBox from './components/SearchBox';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './components/UsersPage';


const App: React.FC = () => {

//props for update user
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
        <Router>
    <Layout>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        {/* Add other routes as needed */}
        <Route path="/" element={<div>IMPROVE PROJECT 2024</div>} />
      </Routes>
    </Layout>
  </Router>
      <SearchBox />
      <CreateUser/>
      {/* להציב בכפתור את האייקון שאיזי הכין */}
      <button onClick={() => setModelOpen(true)}>Update User</button> 
      <UpdateUser isOpen={isModelOpen} onClose={() => setModelOpen(false)} initialUser={someUserData} />
    </div>
  );
};

export default App;
