
import React, { useState } from 'react';
import { Bell, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainMenu from './MainMenu';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = "Les Veilleurs", 
  showBack = false,
  showMenu = true,
  onMenuClick
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (onMenuClick) onMenuClick();
  };

  return (
    <header className="sticky top-0 z-10 bg-veilleur shadow-sm px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button 
              onClick={toggleMenu}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          )}
          {showBack ? (
            <Link 
              to="/"
              className="flex items-center"
            >
              <span className="text-lg font-bold text-white">{title}</span>
            </Link>
          ) : (
            <h1 className="text-lg font-bold text-white">{title}</h1>
          )}
          
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md">
              <MainMenu onClose={() => setMenuOpen(false)} />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/notifications" className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          
          <Link to="/profile" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <User className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
