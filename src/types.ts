export type ApartmentType = {
  id: string;
  title: string;
  price: number;
  pricePerSqm: number;
  sqm: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  picture: string;
};

export type ModalProps = {
  visible: boolean;
  setVisible: (args: boolean) => void;
  filterOptions: any;
  handleFilterOptions: (options: any) => void;
};
