export interface maplayersProps {
  handleLayers: (layer: string) => void;
}

export interface vehicleCardProps {
  isOpen: boolean;
  theme: string;
  changeOpen: () => void;
}
