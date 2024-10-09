import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import './index.css'
import SearchBox from './components/SearchBox';


const App: React.FC = () => {

//props for update user
const [isModelOpen, setModelOpen] = useState(false);
const userId = "66fa8a4bb6d781d148e87519";

  return (
    <div>
      <SearchBox />
      <CreateUser/>
      {/* להציב בכפתור את האייקון שאיזי הכין */}
      <button onClick={() => setModelOpen(true)}>Update User</button> 
      <UpdateUser isOpen={isModelOpen} onClose={() => setModelOpen(false)} userId={userId}/>
    </div>
  );
};

export default App;
