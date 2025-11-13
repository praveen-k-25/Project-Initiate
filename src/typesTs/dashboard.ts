export interface maplayersProps {
  handleLayers: (layer: string) => void;
}

export interface vehicleCardProps {
  isOpen: boolean;
  theme: string;
  changeOpen: () => void;
  handleSelectedVehicle: (data: vehicleStatusData | null) => void;
  selectedVehicle: vehicleStatusData | null;
}

export interface vehicleStatusData {
  time: string;
  user: string;
  username: string;
  lat: number;
  lng: number;
  speed: number;
  status: number;
}
