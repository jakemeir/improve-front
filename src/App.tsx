import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import './index.css'


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
    </div>
  );
};

export default App;
