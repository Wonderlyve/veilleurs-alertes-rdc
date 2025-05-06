
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle,
  MapPin,
  Camera,
  Send,
  X,
  ChevronLeft
} from 'lucide-react';

const AlertPage: React.FC = () => {
  const [alertDescription, setAlertDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { toast } = useToast();

  const handleGetLocation = () => {
    setLoading(true);
    // Simuler la récupération de la géolocalisation
    setTimeout(() => {
      setLocation('Goma, Nord-Kivu');
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleTakePhoto = () => {
    // Dans une vraie app, on activerait la caméra ici
    toast({
      title: "Appareil photo",
      description: "Fonctionnalité de prise de photo à implémenter",
    });
    setStep(3);
  };

  const handleSubmitAlert = () => {
    if (!alertDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez décrire la situation d'urgence",
      });
      return;
    }

    // Simuler l'envoi de l'alerte
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Alerte envoyée",
        description: "Votre alerte a été transmise aux autorités concernées",
      });
      // Rediriger vers la page d'accueil après envoi
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <AppHeader 
        title="Alerte urgente" 
        showBack={true}
      />
      
      <div className="px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-red-800">Mode Alerte</h2>
              <p className="text-sm text-red-700">
                Utilisez ce mode uniquement pour les situations d'urgence nécessitant une intervention immédiate.
              </p>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-gray-800 mb-2">1. Où se trouve l'urgence ?</h3>
              <div className="flex items-center">
                <button
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-veilleur text-white rounded-lg font-medium"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Localisation...
                    </span>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5 mr-2" />
                      Utiliser ma position actuelle
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">1. Localisation</h3>
                <button 
                  onClick={() => setStep(1)}
                  className="text-sm text-veilleur font-medium"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <MapPin className="w-4 h-4 mr-1.5 text-gray-500" />
                <span>{location}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-gray-800 mb-2">2. Prenez une photo (optionnel)</h3>
              <button
                onClick={handleTakePhoto}
                className="w-full flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium border border-gray-200"
              >
                <Camera className="w-5 h-5 mr-2" />
                Prendre une photo
              </button>
            </div>
          </div>
        )}
        
        {step >= 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">1. Localisation</h3>
                <button 
                  onClick={() => setStep(1)}
                  className="text-sm text-veilleur font-medium"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <MapPin className="w-4 h-4 mr-1.5 text-gray-500" />
                <span>{location}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">2. Photo</h3>
                <button 
                  onClick={() => setStep(2)}
                  className="text-sm text-veilleur font-medium"
                >
                  Modifier
                </button>
              </div>
              
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center mt-2">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-gray-800 mb-2">3. Décrivez l'urgence</h3>
              <textarea
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
                placeholder="Décrivez la situation d'urgence en détail..."
                className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              
              <button
                onClick={handleSubmitAlert}
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 bg-red-600 text-white rounded-lg font-medium mt-4"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer l'alerte
                  </>
                )}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                Une alerte urgente sera transmise immédiatement aux autorités concernées. Les fausses alertes peuvent entraîner des sanctions.
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link 
            to="/"
            className="flex items-center justify-center w-full py-2 text-sm text-gray-600"
          >
            <X className="w-4 h-4 mr-1" />
            Annuler et retourner à l'accueil
          </Link>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AlertPage;
