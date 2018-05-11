
export class Car {
  id: number;
  brand: Brand;
  country: string;
  createdAt: Date;
  registration: Date ;
  lastUpdated: Date ;
}

export interface Brand {
  id: number;
  name: string;
}
