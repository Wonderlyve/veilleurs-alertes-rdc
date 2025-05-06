
import React from 'react';

interface TimeAgoProps {
  date: Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSec < 60) {
      return "À l'instant";
    } else if (diffInMin < 60) {
      return `Il y a ${diffInMin} minute${diffInMin > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInDays < 30) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return <span>{formatTimeAgo(date)}</span>;
};

export default TimeAgo;
