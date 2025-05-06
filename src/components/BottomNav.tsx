
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, List, Plus, Bell, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 py-1.5 px-2">
      <div className="flex justify-around items-center">
        <Link to="/" className={`flex flex-col items-center pt-1 pb-0.5 px-3 ${isActive('/') ? 'text-veilleur' : 'text-gray-500'}`}>
          <MapPin className="w-5 h-5" />
          <span className="text-xs mt-1">Carte</span>
        </Link>
        
        <Link to="/reports" className={`flex flex-col items-center pt-1 pb-0.5 px-3 ${isActive('/reports') ? 'text-veilleur' : 'text-gray-500'}`}>
          <List className="w-5 h-5" />
          <span className="text-xs mt-1">Signalements</span>
        </Link>
        
        <Link to="/new-report" className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-veilleur-green rounded-full -mt-5 shadow-md">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs mt-1">Signaler</span>
        </Link>
        
        <Link to="/notifications" className={`flex flex-col items-center pt-1 pb-0.5 px-3 ${isActive('/notifications') ? 'text-veilleur' : 'text-gray-500'}`}>
          <Bell className="w-5 h-5" />
          <span className="text-xs mt-1">Alertes</span>
        </Link>
        
        <Link to="/profile" className={`flex flex-col items-center pt-1 pb-0.5 px-3 ${isActive('/profile') ? 'text-veilleur' : 'text-gray-500'}`}>
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
