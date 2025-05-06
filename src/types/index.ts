
export type Category = 'road' | 'light' | 'trash' | 'water' | 'other';

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
  downvotes?: number; // Ajout des votes négatifs
  userVoted?: 'up' | 'down' | null; // Pour suivre le vote de l'utilisateur actuel
  comments: Comment[];
  isRecurring?: boolean; // Pour marquer les problèmes récurrents
  viewedBy?: ViewedBy[]; // Pour la transparence
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
  role: 'user' | 'admin' | 'super_veilleur'; // Ajout du rôle "super_veilleur"
  reputation?: number; // Pour le système de réputation
  reports?: Report[];
}
