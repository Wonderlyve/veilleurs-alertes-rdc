
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import ReportCard from '../components/ReportCard';
import { mockReports } from '../data/mockData';
import { Search, MapPin, Plus, X } from 'lucide-react';

const HomePage: React.FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Récupérer les signalements récents (limité à 3)
  const recentReports = mockReports
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <AppHeader title="Les Veilleurs" />
      
      {/* Barre de recherche */}
      <div className="bg-veilleur py-2 px-3">
        {isSearching ? (
          <div className="flex items-center bg-white/90 rounded-full py-1 px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un lieu ou un problème..."
              className="flex-1 text-sm py-1 border-none focus:outline-none bg-transparent"
              autoFocus
            />
            <button 
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
              className="p-1"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ) : (
          <button 
            className="flex items-center bg-white/90 rounded-full py-2 px-3 w-full"
            onClick={() => setIsSearching(true)}
          >
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-500 text-sm">Rechercher un lieu ou un problème...</span>
          </button>
        )}
      </div>
      
      {/* Carte */}
      <div className="relative flex-1 overflow-hidden">
        <MapView />
        
        {/* Bouton d'ajout rapide flottant */}
        <Link 
          to="/new-report" 
          className="absolute right-4 top-4 bg-veilleur-green text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <Plus className="w-6 h-6" />
        </Link>
        
        {/* Bouton de localisation flottant */}
        <button className="absolute left-4 top-4 bg-white rounded-full p-3 shadow z-10">
          <MapPin className="w-5 h-5 text-veilleur" />
        </button>
      </div>
      
      {/* Section des signalements récents */}
      <div className="bg-white border-t border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Signalements récents</h2>
          <Link to="/reports" className="text-sm font-medium text-veilleur">
            Tout voir
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentReports.map(report => (
            <ReportCard key={report.id} report={report} compact />
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default HomePage;
