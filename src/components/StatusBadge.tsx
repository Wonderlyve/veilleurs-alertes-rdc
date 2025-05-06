
import React from 'react';
import { Status } from '../types';
import { getStatusLabel } from '../data/mockData';
import { Clock, Loader2, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showLabel = true,
  size = 'md',
  className = ''
}) => {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'pending':
        return <Clock className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'in-progress':
        return <Loader2 className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} animate-spin`} />;
      case 'resolved':
        return <CheckCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium status-${status} ${className}`}>
      {getStatusIcon(status)}
      {showLabel && (
        <span className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'}>
          {getStatusLabel(status)}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
