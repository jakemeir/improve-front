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
              to="/quaetionnaire"
              className={`nav-link ${location.pathname === '/quaetionnaire' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              Registration quaetionnaire
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
              to="/training"
              className={`nav-link ${location.pathname === '/training' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              training
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