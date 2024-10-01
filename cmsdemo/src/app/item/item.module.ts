export interface IImage {
  name: string;
  blob: string;
}

export interface IAccessory {
  name: string;
  description: string;
}

export interface IItem {
  itemid: number;
  regnum: string;
  make: string;
  model: string;
  year: string;
  kms: string;
  colour: string;
  vin: string;
  retail: string;
  cost: string;
}
