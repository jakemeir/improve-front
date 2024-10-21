import React from 'react';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './components/UsersPage';
import Login from './components/Login';
import TrainingPage from './components/TrainingPage';
import QuaetionnaireLayout from './quaetionnaire/QuaetionnaireLayout';
import RecipesPage from './components/RecipesPage';

const App: React.FC = () => {

  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/trainings" element={<TrainingPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            {/* Add other routes as needed */}
            <Route path="/" element={<div>IMPROVE PROJECT 2024</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/quaetionnaire" element={<QuaetionnaireLayout/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
