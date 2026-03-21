export type Disco = {
  discoName: string;
  load: string;
  disco?: string;
  color?: string;
  lat?: number;
  lng?: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  zones?: {
    zoneName: string;
    zoneCoordinates: [number, number];
  }[];
  coordinates: [number, number];
};
