import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

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
    console.log('Logout clicked');
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
              to="/users"
              className={`nav-link ${location.pathname === '/users' ? 'nav-link-active' : ''}`}
              onClick={onClose}
            >
              Users
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Menu;