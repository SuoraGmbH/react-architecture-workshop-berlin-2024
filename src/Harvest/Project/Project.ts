export type Project = {
  id: number;
  name: string;
  client: {
    id: number;
    name: string;
  };

  hourly_rate: number;

  notes: string;

  // ISO 8601 date string
  created_at: string;
  updated_at: string;
};
