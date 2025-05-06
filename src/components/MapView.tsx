
import React, { useState } from 'react';
import { Report } from '../types';
import { mockReports } from '../data/mockData';
import { MapPin, Map as MapIcon, Loader } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

// Simuler une carte interactive - dans une vraie app, utiliser react-native-maps
const MapView: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Simuler un chargement de carte
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Position des signalements sur la carte (simulé)
  const markers = mockReports.map(report => {
    // Convertir coordonnées réelles en positions d'affichage simulées
    const x = ((report.longitude + 15.5) * 100) % 90 + 5;  // Simule longitude
    const y = ((report.latitude + 4.5) * 100) % 90 + 5;    // Simule latitude
    
    return { 
      ...report, 
      posX: `${x}%`, 
      posY: `${y}%` 
    };
  });

  return (
    <div className="relative w-full h-full bg-gray-100">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <Loader className="w-8 h-8 text-veilleur animate-spin mb-2" />
          <p className="text-sm text-gray-600">Chargement de la carte...</p>
        </div>
      ) : (
        <>
          {/* Simulation d'image de carte */}
          <div className="w-full h-full bg-veilleur-light relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full grid grid-cols-8 grid-rows-8">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-gray-400"></div>
                ))}
              </div>
            </div>
            
            {/* Marqueur de position actuelle */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full absolute"></div>
            </div>
            
            {/* Simuler les marqueurs de rapports */}
            {markers.map((marker) => (
              <button 
                key={marker.id}
                className={`absolute z-10 transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform ${selectedPin?.id === marker.id ? 'scale-125 z-20' : ''}`}
                style={{ left: marker.posX, top: marker.posY }}
                onClick={() => setSelectedPin(marker)}
                aria-label={`Marqueur: ${marker.title}`}
              >
                <div className="flex flex-col items-center">
                  <div className={`p-1 rounded-full ${marker.status === 'resolved' ? 'bg-green-500' : marker.status === 'in-progress' ? 'bg-blue-500' : 'bg-red-500'}`}>
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-1 h-5 bg-gray-800 -mt-1 rounded-b-full"></div>
                  {selectedPin?.id === marker.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded-lg shadow-lg text-xs font-medium w-max max-w-[200px] text-center">
                      <p className="truncate">{marker.title}</p>
                      <CategoryBadge category={marker.category} size="sm" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Info du lieu sélectionné */}
          {selectedPin && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3 animate-fade-in">
              <div className="flex items-start">
                {selectedPin.imageUrl ? (
                  <img 
                    src={selectedPin.imageUrl} 
                    alt={selectedPin.title} 
                    className="w-16 h-16 rounded object-cover mr-3"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <MapIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{selectedPin.title}</h3>
                  <div className="flex items-center mt-1">
                    <CategoryBadge category={selectedPin.category} size="sm" />
                    <span className="text-xs text-gray-500 ml-2">{selectedPin.address}</span>
                  </div>
                  <button 
                    className="text-xs text-veilleur mt-2 font-medium"
                    onClick={() => window.location.href = `/reports/${selectedPin.id}`}
                  >
                    Voir les détails
                  </button>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-500 p-1"
                  onClick={() => setSelectedPin(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapView;
