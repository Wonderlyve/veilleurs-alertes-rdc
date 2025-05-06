
import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import ReportCard from '../components/ReportCard';
import { mockReports, categories } from '../data/mockData';
import { Filter, MapPin, SortDesc } from 'lucide-react';
import { Category, Status } from '../types';

const ReportsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Filtrer les signalements
  const filteredReports = mockReports
    .filter(report => selectedCategory === 'all' || report.category === selectedCategory)
    .filter(report => selectedStatus === 'all' || report.status === selectedStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else { // popularity
        return b.upvotes - a.upvotes;
      }
    });

  return (
    <div className="min-h-screen pb-16">
      <AppHeader title="Signalements" />
      
      {/* Filtres */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700"
            >
              <Filter className="w-4 h-4 mr-1.5" />
              Filtres
            </button>
            
            <button
              onClick={() => setSortBy(sortBy === 'date' ? 'popularity' : 'date')}
              className="flex items-center px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700"
            >
              <SortDesc className="w-4 h-4 mr-1.5" />
              {sortBy === 'date' ? 'Date' : 'Popularité'}
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredReports.length} résultat{filteredReports.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Panneau de filtres étendus */}
        {showFilters && (
          <div className="mt-3 pb-1 animate-fade-in">
            <div className="mb-3">
              <h3 className="text-xs font-medium text-gray-500 mb-2">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    selectedCategory === 'all' 
                      ? 'bg-veilleur text-white border-veilleur' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Toutes
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      selectedCategory === category.id 
                        ? 'bg-veilleur text-white border-veilleur' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-medium text-gray-500 mb-2">Statut</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    selectedStatus === 'all' 
                      ? 'bg-veilleur text-white border-veilleur' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Tous
                </button>
                
                <button
                  onClick={() => setSelectedStatus('pending')}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    selectedStatus === 'pending' 
                      ? 'bg-yellow-500 text-white border-yellow-500' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  En attente
                </button>
                
                <button
                  onClick={() => setSelectedStatus('in-progress')}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    selectedStatus === 'in-progress' 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  En cours
                </button>
                
                <button
                  onClick={() => setSelectedStatus('resolved')}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    selectedStatus === 'resolved' 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Résolu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Liste des signalements */}
      {filteredReports.length > 0 ? (
        <div className="px-4 py-4 grid gap-4">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <MapPin className="w-10 h-10 text-gray-300 mb-2" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">Aucun signalement trouvé</h3>
          <p className="text-sm text-gray-500">Modifiez vos filtres ou ajoutez un nouveau signalement</p>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
};

export default ReportsPage;
