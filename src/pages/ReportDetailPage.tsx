
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import TimeAgo from '../components/TimeAgo';
import CategoryBadge from '../components/CategoryBadge';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { mockReports, currentUser } from '../data/mockData';
import { 
  MapPin, 
  ThumbsUp, 
  ThumbsDown,
  Share2, 
  MessageSquare, 
  Send, 
  User,
  ChevronLeft,
  AlertTriangle
} from 'lucide-react';
import { Comment, Report } from '../types';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  const [report, setReport] = useState<Report | undefined>(() => 
    mockReports.find(r => r.id === id)
  );
  const { toast } = useToast();
  
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
      
      // Mise à jour locale (simulation)
      setReport(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [...prev.comments, comment]
        };
      });
      
      setNewComment('');
      
      // Notification de succès
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès",
      });
    }
  };

  // Gérer les votes
  const handleVote = (voteType: 'up' | 'down') => {
    setReport(prev => {
      if (!prev) return prev;
      
      // Si l'utilisateur a déjà voté de la même façon, on annule son vote
      if (prev.userVoted === voteType) {
        const updatedReport = {
          ...prev,
          upvotes: voteType === 'up' ? prev.upvotes - 1 : prev.upvotes,
          downvotes: voteType === 'down' ? (prev.downvotes || 0) - 1 : (prev.downvotes || 0),
          userVoted: null
        };
        
        toast({
          title: "Vote retiré",
          description: "Votre vote a été retiré avec succès",
        });
        
        return updatedReport;
      }
      
      // Si l'utilisateur a voté dans l'autre sens précédemment
      if (prev.userVoted && prev.userVoted !== voteType) {
        const updatedReport = {
          ...prev,
          upvotes: voteType === 'up' ? prev.upvotes + 1 : prev.upvotes - 1,
          downvotes: voteType === 'down' ? (prev.downvotes || 0) + 1 : (prev.downvotes || 0) - 1,
          userVoted: voteType
        };
        
        toast({
          title: "Vote modifié",
          description: `Vous avez ${voteType === 'up' ? 'approuvé' : 'désapprouvé'} ce signalement`,
        });
        
        return updatedReport;
      }
      
      // Premier vote de l'utilisateur
      const updatedReport = {
        ...prev,
        upvotes: voteType === 'up' ? prev.upvotes + 1 : prev.upvotes,
        downvotes: voteType === 'down' ? (prev.downvotes || 0) + 1 : (prev.downvotes || 0),
        userVoted: voteType
      };
      
      toast({
        title: "Merci pour votre vote",
        description: `Vous avez ${voteType === 'up' ? 'approuvé' : 'désapprouvé'} ce signalement`,
      });
      
      return updatedReport;
    });
  };

  // Récupérer le statut de récurrence du problème
  const isRecurringProblem = report.isRecurring;

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
            <h1 className="text-xl font-bold text-gray-900">
              {report.title}
              {isRecurringProblem && (
                <span className="ml-2 inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Récurrent
                </span>
              )}
            </h1>
            <div className="flex items-center mt-2">
              <CategoryBadge category={report.category} />
              <StatusBadge status={report.status} className="ml-2" />
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              className={`p-2 rounded-full ${report.userVoted === 'up' ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-500'}`}
              onClick={() => handleVote('up')}
              aria-label="Voter pour"
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button
              className={`p-2 rounded-full ${report.userVoted === 'down' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'}`}
              onClick={() => handleVote('down')}
              aria-label="Voter contre"
            >
              <ThumbsDown className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-full bg-gray-50 text-gray-500"
              onClick={() => {
                // Dans une vraie app, implémentez le partage ici
                toast({
                  title: "Partage",
                  description: "Fonctionnalité de partage à implémenter",
                });
              }}
            >
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
          <div className="flex items-center mr-4">
            <div className="flex items-center text-gray-600 text-sm">
              <ThumbsUp className="w-4 h-4 mr-1.5" />
              <span>{report.upvotes} personne{report.upvotes !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          {report.downvotes && report.downvotes > 0 && (
            <div className="flex items-center">
              <div className="flex items-center text-gray-600 text-sm">
                <ThumbsDown className="w-4 h-4 mr-1.5" />
                <span>{report.downvotes} personne{report.downvotes !== 1 ? 's' : ''}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Journal de transparence (si disponible) */}
        {report.viewedBy && report.viewedBy.length > 0 && (
          <div className="mt-4 pt-2 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Journal d'actions</h3>
            <div className="space-y-1.5">
              {report.viewedBy.map((view, i) => (
                <div key={i} className="text-xs text-gray-600">
                  {view.action ? view.action : "Vu par"} <span className="font-medium">{view.organizationName}</span> le {new Date(view.viewedAt).toLocaleDateString('fr-FR')}
                </div>
              ))}
            </div>
          </div>
        )}
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
