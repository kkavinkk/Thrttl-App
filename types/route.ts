export type LatLng = {
  latitude: number;
  longitude: number;
};

export type GeneratedRoute = {
  id: string;
  points: LatLng[];
};
