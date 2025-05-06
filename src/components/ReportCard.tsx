
import React from 'react';
import { Link } from 'react-router-dom';
import { Report } from '../types';
import TimeAgo from './TimeAgo';
import CategoryBadge from './CategoryBadge';
import StatusBadge from './StatusBadge';
import { MapPin, ThumbsUp, MessageSquare } from 'lucide-react';

interface ReportCardProps {
  report: Report;
  compact?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, compact = false }) => {
  if (compact) {
    return (
      <Link to={`/reports/${report.id}`} className="flex items-center p-3 border-b border-gray-100">
        <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
          {report.imageUrl && (
            <img 
              src={report.imageUrl} 
              alt={report.title} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{report.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-0.5">
            <CategoryBadge category={report.category} size="sm" />
            <span className="mx-1.5">•</span>
            <TimeAgo date={report.createdAt} />
          </div>
        </div>
        <StatusBadge status={report.status} showLabel={false} size="sm" />
      </Link>
    );
  }

  return (
    <Link to={`/reports/${report.id}`} className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      {report.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={report.imageUrl} 
            alt={report.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex justify-between items-end">
              <CategoryBadge category={report.category} />
              <StatusBadge status={report.status} />
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
        
        <div className="flex items-center mt-1.5 mb-2 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span className="truncate">{report.address || "Adresse non disponible"}</span>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <span>Par {report.userName}</span>
            <span className="mx-1.5">•</span>
            <TimeAgo date={report.createdAt} />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-500 text-xs">
              <ThumbsUp className="w-3.5 h-3.5 mr-1" />
              <span>{report.upvotes}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-xs">
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              <span>{report.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
