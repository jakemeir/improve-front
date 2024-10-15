import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, Copyright, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../style/Layout.css';
import Login from './Login';
import Cookies from 'js-cookie';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="layout-container">
      <div className="content-wrapper">
        <div className="main-content-wrapper">
          <header className="header">
            <Link to="/" className="header-logo">
              IMPROVE
            </Link>
            {isMobile && (
              <button onClick={toggleMenu} className="menu-toggle">
                <MenuIcon size={24} />
              </button>
            )}
          </header>
          
          <main className="main-content">{children}
           <div>
              <Login/>
            </div> 
          </main>
          <footer className="footer">
            <span className="footer-text">
              <Copyright size={16} /> All rights reserved Basmach 12
            </span>
          </footer>
        </div>
        <Menu isOpen={!isMobile || isMenuOpen} onClose={() => setIsMenuOpen(false)} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default Layout;