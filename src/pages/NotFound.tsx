
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-yellow-500" />
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Page introuvable</h1>
      <p className="text-gray-600 text-center mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      
      <Link 
        to="/"
        className="flex items-center justify-center px-5 py-3 bg-veilleur text-white rounded-lg font-medium"
      >
        <Home className="w-5 h-5 mr-2" />
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
