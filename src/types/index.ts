
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
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
  isOfficial?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: 'user' | 'admin';
  reports?: Report[];
}
