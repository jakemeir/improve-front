import React from 'react';
import CreateUser from './components/CreateUser';
import './index.css'
import ExportUserButton from './components/ExportUserButton';


const App: React.FC = () => {
  return (
    <div>
      <CreateUser/>
      {/* <ExportUserButton/> */}
      <a href='http://localhost:8080/users/export'>export</a>
    </div>
  );
};

export default App;
