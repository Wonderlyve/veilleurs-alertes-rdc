
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import TimeAgo from '../components/TimeAgo';
import CategoryBadge from '../components/CategoryBadge';
import StatusBadge from '../components/StatusBadge';
import { mockReports, currentUser } from '../data/mockData';
import { 
  MapPin, 
  ThumbsUp, 
  Share2, 
  MessageSquare, 
  Send, 
  User,
  ChevronLeft 
} from 'lucide-react';
import { Comment } from '../types';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  
  const report = mockReports.find(r => r.id === id);
  
  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-3">Signalement introuvable</h1>
        <p className="text-gray-600 mb-6">Ce signalement n'existe pas ou a été supprimé.</p>
        <Link 
          to="/reports" 
          className="inline-flex items-center px-4 py-2 bg-veilleur text-white font-medium rounded-md"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Retour aux signalements
        </Link>
      </div>
    );
  }

  // Gérer l'envoi d'un commentaire
  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Dans une vraie app, cela enverrait un nouveau commentaire à l'API
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        text: newComment,
        userId: currentUser.id,
        userName: currentUser.name,
        createdAt: new Date(),
      };
      
      console.log('Nouveau commentaire:', comment);
      setNewComment('');
      
      // Afficher une notification de réussite
      alert('Commentaire ajouté!');
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <AppHeader 
        title="Détails" 
        showBack={true}
      />
      
      {/* Image */}
      {report.imageUrl && (
        <div className="relative h-64 bg-gray-200">
          <img 
            src={report.imageUrl} 
            alt={report.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* En-tête du rapport */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{report.title}</h1>
            <div className="flex items-center mt-2">
              <CategoryBadge category={report.category} />
              <StatusBadge status={report.status} className="ml-2" />
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              className={`p-2 rounded-full ${liked ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-500'}`}
              onClick={() => setLiked(!liked)}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-50 text-gray-500">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Informations */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1.5 text-gray-500" />
          <span>{report.address || "Adresse non disponible"}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <span className="text-gray-600">Signalé par </span>
          <span className="font-medium text-gray-800 ml-1">{report.userName}</span>
          <span className="mx-1.5 text-gray-500">•</span>
          <TimeAgo date={report.createdAt} />
        </div>
        
        <p className="text-gray-800">{report.description}</p>
        
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600 text-sm">
            <ThumbsUp className="w-4 h-4 mr-1.5" />
            <span>{report.upvotes} personne{report.upvotes !== 1 ? 's' : ''} {report.upvotes !== 1 ? 'trouvent' : 'trouve'} ce signalement utile</span>
          </div>
        </div>
      </div>
      
      {/* Commentaires */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-lg mb-4">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Commentaires ({report.comments.length})
          </div>
        </h2>
        
        {report.comments.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
            <p className="text-gray-500 text-sm mt-1">Soyez le premier à commenter!</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {report.comments.map((comment) => (
              <div 
                key={comment.id} 
                className={`p-3 rounded-lg ${comment.isOfficial ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center ${comment.isOfficial ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{comment.userName}</span>
                      {comment.isOfficial && (
                        <span className="ml-1.5 py-0.5 px-1.5 bg-blue-500 text-white text-xs rounded-sm font-medium">
                          Officiel
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      <TimeAgo date={comment.createdAt} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Formulaire de commentaire */}
        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
          <div className="w-8 h-8 rounded-full bg-veilleur flex items-center justify-center mr-2">
            <User className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-veilleur"
          />
          <button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={`ml-2 p-2 rounded-full ${
              newComment.trim() ? 'bg-veilleur text-white' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ReportDetailPage;
