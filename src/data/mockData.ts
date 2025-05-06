
import { Report, User, Category, Status } from "../types";

// Utilisateurs de démonstration
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Jean Mutombo",
    email: "jean@example.com",
    role: "user",
  },
  {
    id: "user2",
    name: "Marie Lukusa",
    email: "marie@example.com",
    role: "user",
  },
  {
    id: "admin1",
    name: "Admin Municipal",
    email: "admin@kinshasa-gov.cd",
    role: "admin",
  }
];

// Données de signalements de démonstration
export const mockReports: Report[] = [
  {
    id: "report1",
    title: "Nid de poule dangereux",
    description: "Large nid de poule qui occupe toute la largeur de la route, dangereux pour les véhicules et motos.",
    category: "road" as Category,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    latitude: -4.325,
    longitude: 15.322,
    address: "Avenue Lumumba, Kinshasa",
    status: "pending" as Status,
    createdAt: new Date(2023, 5, 10),
    userId: "user1",
    userName: "Jean Mutombo",
    upvotes: 15,
    comments: [
      {
        id: "comment1",
        text: "J'ai aussi failli avoir un accident ici hier!",
        userId: "user2",
        userName: "Marie Lukusa",
        createdAt: new Date(2023, 5, 11),
      }
    ],
  },
  {
    id: "report2",
    title: "Lampadaire cassé",
    description: "Lampadaire non fonctionnel depuis 3 semaines, quartier très sombre et dangereux la nuit.",
    category: "light" as Category,
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    latitude: -4.331,
    longitude: 15.314,
    address: "Rue des Artistes, Gombe, Kinshasa",
    status: "in-progress" as Status,
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 5, 15),
    userId: "user2",
    userName: "Marie Lukusa",
    upvotes: 8,
    comments: [
      {
        id: "comment2",
        text: "Une équipe de maintenance a été envoyée et interviendra dans les prochains jours.",
        userId: "admin1",
        userName: "Admin Municipal",
        createdAt: new Date(2023, 5, 15),
        isOfficial: true,
      }
    ],
  },
  {
    id: "report3",
    title: "Décharge sauvage",
    description: "Accumulation de déchets qui bloquent le passage et créent des odeurs nauséabondes.",
    category: "trash" as Category,
    imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    latitude: -4.329,
    longitude: 15.307,
    address: "Marché Central, Kinshasa",
    status: "resolved" as Status,
    createdAt: new Date(2023, 5, 1),
    updatedAt: new Date(2023, 5, 8),
    userId: "user1",
    userName: "Jean Mutombo",
    upvotes: 23,
    comments: [
      {
        id: "comment3",
        text: "Cette situation est inacceptable pour notre santé!",
        userId: "user2",
        userName: "Marie Lukusa",
        createdAt: new Date(2023, 5, 2),
      },
      {
        id: "comment4",
        text: "Le service de nettoyage est intervenu et a évacué tous les déchets. Merci pour votre signalement.",
        userId: "admin1",
        userName: "Admin Municipal",
        createdAt: new Date(2023, 5, 8),
        isOfficial: true,
      }
    ],
  },
  {
    id: "report4",
    title: "Inondation sur la route principale",
    description: "Eau stagnante qui rend la route impraticable après les fortes pluies d'hier.",
    category: "water" as Category,
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    latitude: -4.318,
    longitude: 15.298,
    address: "Boulevard du 30 Juin, Kinshasa",
    status: "pending" as Status,
    createdAt: new Date(2023, 5, 18),
    userId: "user2",
    userName: "Marie Lukusa",
    upvotes: 12,
    comments: [],
  },
  {
    id: "report5",
    title: "Pont endommagé",
    description: "Structure du pont qui semble compromise, fissures visibles sur les piliers.",
    category: "other" as Category,
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    latitude: -4.334,
    longitude: 15.290,
    address: "Pont sur la rivière N'djili, Kinshasa",
    status: "in-progress" as Status,
    createdAt: new Date(2023, 5, 14),
    updatedAt: new Date(2023, 5, 15),
    userId: "user1",
    userName: "Jean Mutombo",
    upvotes: 45,
    comments: [
      {
        id: "comment5",
        text: "Une inspection d'urgence a été commandée. Merci pour cette alerte importante.",
        userId: "admin1",
        userName: "Admin Municipal",
        createdAt: new Date(2023, 5, 15),
        isOfficial: true,
      }
    ],
  },
];

// Catégories disponibles pour les signalements
export const categories = [
  { id: "road", label: "Voirie", icon: "map" },
  { id: "light", label: "Éclairage", icon: "lamp" },
  { id: "trash", label: "Déchets", icon: "trash" },
  { id: "water", label: "Inondation/Eau", icon: "water" },
  { id: "other", label: "Autre", icon: "more" },
];

// Traduire les statuts pour l'affichage
export const getStatusLabel = (status: Status) => {
  switch(status) {
    case "pending": return "En attente";
    case "in-progress": return "En cours";
    case "resolved": return "Résolu";
    default: return status;
  }
};

// Traduire les catégories pour l'affichage
export const getCategoryLabel = (category: Category) => {
  const found = categories.find(c => c.id === category);
  return found ? found.label : category;
};

// Utilisateur connecté (simulation)
export const currentUser = mockUsers[0];
