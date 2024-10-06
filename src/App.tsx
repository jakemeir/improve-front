import React, { useState } from 'react';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import './index.css'


const App: React.FC = () => {

  const [isModelOpen, setModelOpen] = useState(false);

  // An example of a user in the list
  const someUserData = {
    firstName: "Dummy",
    lastName: "User",
    email: "dummyuser@example.com",
    phone: "054-1234567",
    password: "password123",
    role: "user"
};


  return (
    <div>
      <CreateUser/>
      {/* להציב בכפתור את האייקון שאיזי הכין */}
      <button onClick={() => setModelOpen(true)}>Update User</button> 
      <UpdateUser 
        isOpen={isModelOpen} 
        onClose={() => setModelOpen(false)}
        initialUser={someUserData} 
      />
    </div>
  );
};

export default App;
