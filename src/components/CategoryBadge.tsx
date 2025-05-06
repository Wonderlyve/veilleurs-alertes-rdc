
import React from 'react';
import { Category } from '../types';
import { categories, getCategoryLabel } from '../data/mockData';
import { FileImage, Map, Lightbulb, Trash2, Droplet, HelpCircle } from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  showLabel = true,
  size = 'md' 
}) => {
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'road':
        return <Map className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'light':
        return <Lightbulb className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'trash':
        return <Trash2 className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'water':
        return <Droplet className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      default:
        return <HelpCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
    }
  };

  return (
    <div className={`category-badge category-${category}`}>
      {getCategoryIcon(category)}
      {showLabel && (
        <span className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'}>
          {getCategoryLabel(category)}
        </span>
      )}
    </div>
  );
};

export default CategoryBadge;
