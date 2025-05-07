
export type Category = 'road' | 'light' | 'trash' | 'water' | 'other' | 'traffic' | 'transport' | 'security';

// Add this enum to use Category as a value
export enum CategoryEnum {
  road = 'road',
  light = 'light',
  trash = 'trash',
  water = 'water',
  other = 'other',
  traffic = 'traffic',
  transport = 'transport',
  security = 'security'
}

export type Status = 'pending' | 'in-progress' | 'resolved';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  address?: string;
  status: Status;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  userName: string;
  upvotes: number;
  downvotes?: number;
  userVoted?: 'up' | 'down' | null;
  comments: Comment[];
  isRecurring?: boolean;
  viewedBy?: ViewedBy[];
  severity?: 'low' | 'medium' | 'high' | 'critical';
  trafficImpact?: 'none' | 'light' | 'moderate' | 'severe';
  securityType?: 'theft' | 'assault' | 'vandalism' | 'suspicious' | 'other';
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
  isOfficial?: boolean;
}

export interface ViewedBy {
  organizationId: string;
  organizationName: string;
  viewedAt: Date;
  action?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: 'user' | 'admin' | 'super_veilleur';
  reputation?: number;
  reports?: Report[];
}
