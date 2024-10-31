import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';

const ImproveLogo: React.FC = () => (
  <div className="improve-logo">
    IMPROVE
  </div>
);

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/login';
  };

  return (
    <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
      {isMobile && (
        <button className="close-menu" onClick={onClose}>
          ×
        </button>
      )}
      <div className="nav-content">
        <div className="nav-header">
          <Link to="/" onClick={onClose}>
            <ImproveLogo />
          </Link>
        </div>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link
              to="/questionnaire"
              className={`nav-link ${location.pathname === '/questionnaire' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              Registration <br /> questionnaire
            </Link>
          </li>
          <li className="nav-list-item">
            <Link
              to="/users"
              className={`nav-link ${location.pathname === '/users' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              Users
            </Link>
          </li>
          <li className="nav-list-item">
            <Link
              to="/trainings"
              className={`nav-link ${location.pathname === '/trainings' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              training
            </Link>
          </li>
          <li className="nav-list-item">
            <Link
              to="/recipes"
              className={`nav-link ${location.pathname === '/recipes' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              Recipes
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Menu;