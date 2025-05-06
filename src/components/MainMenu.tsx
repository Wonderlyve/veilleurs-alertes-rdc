
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { 
  MapPin, 
  AlertTriangle, 
  Trash2, 
  Droplet, 
  Lightbulb, 
  Menu as MenuIcon,
  Car,
  Shield
} from 'lucide-react';

const MainMenu: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white">Signalements</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 w-[400px] gap-3 p-4">
              <button 
                onClick={() => handleNavigation('/new-report?category=road')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Voirie</div>
                  <div className="text-xs text-gray-500">Nids de poule, routes abîmées...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=light')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Éclairage</div>
                  <div className="text-xs text-gray-500">Lampadaires cassés, zones sombres...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=trash')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Déchets</div>
                  <div className="text-xs text-gray-500">Dépôts sauvages, poubelles...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=water')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Eau</div>
                  <div className="text-xs text-gray-500">Fuites, inondations...</div>
                </div>
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white">Trafic</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 w-[400px] gap-3 p-4">
              <button 
                onClick={() => handleNavigation('/new-report?category=traffic&type=accident')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Accident</div>
                  <div className="text-xs text-gray-500">Collision, incident routier...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=traffic&type=congestion')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Car className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Embouteillage</div>
                  <div className="text-xs text-gray-500">Trafic dense, route bloquée...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=transport')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Car className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Transport</div>
                  <div className="text-xs text-gray-500">Problèmes de transport public...</div>
                </div>
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white">Sécurité</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 w-[400px] gap-3 p-4">
              <button 
                onClick={() => handleNavigation('/new-report?category=security&type=suspicious')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Activité suspecte</div>
                  <div className="text-xs text-gray-500">Comportements douteux, risques...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/new-report?category=security&type=vandalism')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Vandalisme</div>
                  <div className="text-xs text-gray-500">Dégradations, graffitis...</div>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/alert')}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 col-span-2 bg-red-50"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Alerte urgente</div>
                  <div className="text-xs text-gray-500">Danger immédiat, situation critique...</div>
                </div>
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainMenu;
