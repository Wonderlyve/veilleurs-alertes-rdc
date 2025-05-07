
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Image, MapPin, ChevronLeft, AlertTriangle, CheckCircle, Car, Shield } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import { categories } from '../data/mockData';
import { Category, CategoryEnum } from '../types';

const NewReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '' as Category | '',
    description: '',
    imageUrl: '',
    locationName: 'Votre position actuelle', // Simulée
    severity: '',
    trafficImpact: '',
    securityType: ''
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Préremplir la catégorie si elle est spécifiée dans l'URL
  useEffect(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    if (category && Object.values(CategoryEnum).includes(category as Category)) {
      setFormData(prev => ({ 
        ...prev, 
        category: category as Category,
        // Si un type spécifique est fourni pour la sécurité ou le trafic
        securityType: category === 'security' && type ? type : prev.securityType,
        trafficImpact: category === 'traffic' && type ? type : prev.trafficImpact
      }));
    }
  }, [searchParams]);
  
  // Vérifier si le formulaire est valide pour passer à l'étape suivante
  const isStepValid = () => {
    if (formStep === 1) {
      return !!formData.category;
    } else if (formStep === 2) {
      return !!formData.title && formData.title.length >= 5 && !!formData.description;
    }
    return true;
  };
  
  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Simuler le téléchargement d'une image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dans une vraie app, cela téléchargerait l'image vers le serveur
      // Pour cette démo, on simule juste un URL local
      const fakeUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      setFormData(prev => ({ ...prev, imageUrl: fakeUrl }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  // Simuler la prise d'une photo
  const handleTakePhoto = () => {
    // Dans une vraie app, cela ouvrirait l'appareil photo
    alert("Dans la vraie app, cela ouvrirait l'appareil photo de l'appareil.");
    
    // Pour cette démo, on simule juste une image
    const fakeUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    setFormData(prev => ({ ...prev, imageUrl: fakeUrl }));
    setPreviewUrl(fakeUrl);
  };
  
  // Simuler la géolocalisation
  const handleGeolocate = () => {
    alert("Dans la vraie app, cela utiliserait la géolocalisation de l'appareil.");
    setFormData(prev => ({ ...prev, locationName: "Votre position a été mise à jour" }));
  };
  
  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler une soumission
    setTimeout(() => {
      console.log('Formulaire soumis:', formData);
      setIsSubmitting(false);
      navigate('/report-success');
    }, 1500);
  };
  
  // Vérifier si le formulaire est valide pour passer à l'étape suivante
  const isStepValid = () => {
    if (formStep === 1) {
      return !!formData.category;
    } else if (formStep === 2) {
      return !!formData.title && formData.title.length >= 5 && !!formData.description;
    }
    return true;
  };
  
  // Afficher les champs supplémentaires selon la catégorie
  const renderCategorySpecificFields = () => {
    switch(formData.category) {
      case 'traffic':
      case 'transport':
        return (
          <div className="mt-4">
            <label htmlFor="trafficImpact" className="block text-sm font-medium text-gray-700 mb-1">
              Impact sur la circulation
            </label>
            <select
              id="trafficImpact"
              name="trafficImpact"
              value={formData.trafficImpact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
            >
              <option value="">Sélectionnez l'impact</option>
              <option value="none">Aucun impact</option>
              <option value="light">Impact léger</option>
              <option value="moderate">Impact modéré</option>
              <option value="severe">Impact sévère</option>
            </select>
            
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Gravité
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
            >
              <option value="">Sélectionnez la gravité</option>
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="critical">Critique</option>
            </select>
          </div>
        );
      
      case 'security':
        return (
          <div className="mt-4">
            <label htmlFor="securityType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de problème de sécurité
            </label>
            <select
              id="securityType"
              name="securityType"
              value={formData.securityType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
            >
              <option value="">Sélectionnez le type</option>
              <option value="theft">Vol</option>
              <option value="assault">Agression</option>
              <option value="vandalism">Vandalisme</option>
              <option value="suspicious">Activité suspecte</option>
              <option value="other">Autre</option>
            </select>
            
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Gravité
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
            >
              <option value="">Sélectionnez la gravité</option>
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="critical">Critique</option>
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Afficher l'étape correspondante
  const renderFormStep = () => {
    switch(formStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Quelle est la nature du problème?</h2>
            
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id as Category }))}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                    formData.category === category.id 
                      ? 'border-veilleur-green bg-veilleur-green/10' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    formData.category === category.id 
                      ? 'bg-veilleur-green text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.id === 'traffic' ? <Car className="w-6 h-6" /> : 
                     category.id === 'security' ? <Shield className="w-6 h-6" /> : 
                     <MapPin className="w-6 h-6" />}
                  </div>
                  <span className={`font-medium ${
                    formData.category === category.id 
                      ? 'text-veilleur-green' 
                      : 'text-gray-700'
                  }`}>
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={() => setFormStep(2)}
                className={`px-5 py-2.5 rounded-lg font-medium ${
                  isStepValid() 
                    ? 'bg-veilleur text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                Continuer
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Décrivez le problème</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du signalement*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Nid de poule dangereux"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description détaillée*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Décrivez le problème en détail..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-veilleur focus:border-veilleur"
                  required
                />
              </div>
              
              {/* Nouveaux champs spécifiques à la catégorie */}
              {renderCategorySpecificFields()}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700"
              >
                Retour
              </button>
              
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={() => setFormStep(3)}
                className={`px-5 py-2.5 rounded-lg font-medium ${
                  isStepValid() 
                    ? 'bg-veilleur text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                Continuer
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Ajoutez une photo</h2>
            
            {previewUrl ? (
              <div className="mb-4 relative">
                <img 
                  src={previewUrl} 
                  alt="Aperçu" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                >
                  <AlertTriangle className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Prendre une photo</span>
                </button>
                
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Image className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Choisir une image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            
            <h2 className="text-lg font-bold mb-4 mt-6">Localisation</h2>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center mb-4">
              <MapPin className="w-5 h-5 text-veilleur mr-2" />
              <span className="flex-1 text-gray-700">{formData.locationName}</span>
              <button
                type="button"
                onClick={handleGeolocate}
                className="text-veilleur font-medium text-sm"
              >
                Mettre à jour
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-4">
              <span className="text-gray-500">Carte de localisation (simulée)</span>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setFormStep(2)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700"
              >
                Retour
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2.5 rounded-lg font-medium ${
                  isSubmitting 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-veilleur-green text-white'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le signalement'}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <AppHeader 
        title="Nouveau signalement" 
        showBack={true}
      />
      
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep === step 
                    ? 'bg-veilleur text-white' 
                    : formStep > step 
                    ? 'bg-veilleur-green text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {formStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                
                {step < 3 && (
                  <div className={`flex-1 h-1 ${
                    formStep > step ? 'bg-veilleur-green' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {renderFormStep()}
        </form>
      </div>
    </div>
  );
};

export default NewReportPage;
