
import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <header className="sticky top-0 z-10 bg-veilleur shadow-sm px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button 
              onClick={onMenuClick}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-white" />
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
