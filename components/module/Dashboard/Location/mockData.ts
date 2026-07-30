export interface LocationStatItem {
  title: string;
  value: string;
}

export const mockLocationStats: LocationStatItem[] = [
  {
    title: "Total countries",
    value: "18",
  },
  {
    title: "Total states",
    value: "112",
  },
  {
    title: "Total cities",
    value: "200",
  },
  {
    title: "Total service areas",
    value: "432",
  },
];

export interface LocationItem {
  id: string;
  country: string;
  currency: string;
  state: number;
  cities: number;
  serviceAreas: number;
  status: "Active" | "Deleted";
}

export const mockLocations: LocationItem[] = [
  {
    id: "1",
    country: "Nigeria",
    currency: "NGN",
    state: 12,
    cities: 36,
    serviceAreas: 48,
    status: "Active",
  },
  {
    id: "2",
    country: "Ghana",
    currency: "GHS",
    state: 60,
    cities: 38,
    serviceAreas: 168,
    status: "Deleted",
  },
  {
    id: "3",
    country: "Ivory Coast",
    currency: "XOF",
    state: 36,
    cities: 40,
    serviceAreas: 120,
    status: "Active",
  },
  {
    id: "4",
    country: "Nigeria",
    currency: "XOF",
    state: 48,
    cities: 41,
    serviceAreas: 96,
    status: "Deleted",
  },
  {
    id: "5",
    country: "Senegal",
    currency: "SN",
    state: 72,
    cities: 39,
    serviceAreas: 144,
    status: "Active",
  },
  {
    id: "6",
    country: "Benin",
    currency: "CFA",
    state: 24,
    cities: 37,
    serviceAreas: 72,
    status: "Active",
  },
  {
    id: "7",
    country: "Togo",
    currency: "CFA",
    state: 84,
    cities: 42,
    serviceAreas: 192,
    status: "Active",
  },
];
