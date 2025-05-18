export interface Point {
  latitude: number;
  longitude: number;
}

export interface Polygon {
  id: string;
  name?: string;
  points: Point[];
}

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
} 