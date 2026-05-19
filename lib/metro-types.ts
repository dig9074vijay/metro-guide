export interface LineData {
  id: number;
  name: string;
  line_color: string;
  line_code: string;
  primary_color_code: string;
  secondary_color_code: string;
  class_primary: string;
  start_station: string;
  end_station: string;
  show_in_frontend: boolean;
  status: string;
}

export interface StationFacility {
  name: string;
  class_name: string;
}

export interface StationData {
  id: number;
  station_name: string;
  station_code: string;
  station_facility: StationFacility[];
  interchange: boolean;
  status: string;
}

export interface MetroLine {
  line: LineData;
  stations: StationData[];
}

export interface StationNode {
  stationName: string;
  stationCode: string;
  lineCode: string;
  lineName: string;
  lineColor: string;
  primaryColor: string;
  isInterchange: boolean;
  indexOnLine: number;
  totalStationsOnLine: number;
}

export interface GraphEdge {
  to: string; // "stationName|lineCode"
  weight: number;
  isInterchange: boolean;
}

export type RouteStrategy = "shortest" | "min-interchange";

export interface RouteStep {
  stationName: string;
  stationCode: string;
  lineCode: string;
  lineName: string;
  lineColor: string;
  primaryColor: string;
  isInterchange: boolean;
  action: "board" | "travel" | "interchange" | "arrive";
  direction?: string; // e.g. "towards SAMAYPUR BADLI"
}

export interface RouteSegment {
  lineCode: string;
  lineName: string;
  lineColor: string;
  primaryColor: string;
  direction: string;
  stations: RouteStep[];
  interchangeAt?: string;
}

export interface RouteResult {
  segments: RouteSegment[];
  totalStations: number;
  totalInterchanges: number;
  estimatedMinutes: number;
  fareEstimate: string;
  strategy: RouteStrategy;
}
