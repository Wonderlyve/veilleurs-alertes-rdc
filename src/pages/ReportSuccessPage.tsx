
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, List } from 'lucide-react';

const ReportSuccessPage: React.FC = () => {
  useEffect(() => {
    // Simuler un délai pour l'animation
    const timer = setTimeout(() => {
      document.getElementById('success-icon')?.classList.add('scale-100');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div id="success-icon" className="w-24 h-24 bg-veilleur-green rounded-full flex items-center justify-center mb-6 scale-0 transform transition-transform duration-500">
        <CheckCircle className="w-14 h-14 text-white" />
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Signalement envoyé!</h1>
      <p className="text-gray-600 text-center mb-8">
        Merci pour votre contribution à l'amélioration de votre communauté.
      </p>
      
      <div className="space-y-3 w-full max-w-xs">
        <Link 
          to="/"
          className="flex items-center justify-center w-full px-4 py-3 bg-veilleur text-white rounded-lg font-medium"
        >
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
        
        <Link 
          to="/reports"
          className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
        >
          <List className="w-5 h-5 mr-2" />
          Voir tous les signalements
        </Link>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-1">Vous recevrez des notifications sur l'évolution de ce signalement</p>
        <p className="text-sm text-gray-500">Les autorités concernées ont été informées.</p>
      </div>
    </div>
  );
};

export default ReportSuccessPage;
