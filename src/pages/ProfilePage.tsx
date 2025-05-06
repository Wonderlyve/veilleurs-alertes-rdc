
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import ReportCard from '../components/ReportCard';
import { mockReports, currentUser } from '../data/mockData';
import { User, Settings, LogOut, List, ChevronRight } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'info'>('reports');
  
  // Filtrer les rapports de l'utilisateur
  const userReports = mockReports.filter(report => report.userId === currentUser.id);

  return (
    <div className="min-h-screen pb-16">
      <AppHeader title="Mon profil" />
      
      {/* En-tête du profil */}
      <div className="bg-veilleur pt-4 pb-8 px-4 text-white">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          
          <div className="ml-4">
            <h2 className="text-lg font-bold">{currentUser.name}</h2>
            <p className="text-white/80">{currentUser.email}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold">{userReports.length}</div>
            <div className="text-xs text-white/80">Signalements</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">
              {userReports.reduce((acc, report) => acc + report.upvotes, 0)}
            </div>
            <div className="text-xs text-white/80">J'aime reçus</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">
              {userReports.filter(report => report.status === 'resolved').length}
            </div>
            <div className="text-xs text-white/80">Résolus</div>
          </div>
        </div>
      </div>
      
      {/* Onglets */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-medium text-center ${
              activeTab === 'reports' 
                ? 'text-veilleur border-b-2 border-veilleur' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            Mes signalements
          </button>
          
          <button
            className={`flex-1 py-3 text-sm font-medium text-center ${
              activeTab === 'info' 
                ? 'text-veilleur border-b-2 border-veilleur' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Paramètres
          </button>
        </div>
      </div>
      
      {/* Contenu des onglets */}
      {activeTab === 'reports' ? (
        userReports.length > 0 ? (
          <div className="p-4 grid gap-4">
            {userReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center mt-8">
            <List className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun signalement</h3>
            <p className="text-sm text-gray-500 mb-6">Vous n'avez pas encore créé de signalement</p>
            
            <Link 
              to="/new-report"
              className="px-4 py-2 bg-veilleur text-white rounded-lg font-medium"
            >
              Créer un signalement
            </Link>
          </div>
        )
      ) : (
        <div className="p-4">
          <div className="space-y-4">
            <button className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <span>Modifier mon profil</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <span>Paramètres de l'application</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-red-500">Se déconnecter</span>
              </div>
            </button>
          </div>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
