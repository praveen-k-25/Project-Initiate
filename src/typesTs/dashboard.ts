export interface maplayersProps {
  handleLayers: (layer: string) => void;
}

export interface vehicleCardProps {
  isOpen: boolean;
  theme: string;
  changeOpen: () => void;
}

export interface vehicleData {
  user: string;
  timestamp: number;
  time: string;
  lat: number;
  lng: number;
  speed: number;
  status: string;
}
