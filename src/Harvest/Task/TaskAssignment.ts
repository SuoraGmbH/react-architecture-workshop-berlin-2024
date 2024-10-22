export type TaskAssignment = {
  id: number;
  is_active: boolean;

  billable: boolean;
  hourly_rate: number;

  project: {
    id: number;
    name: string;
  };
  task: {
    id: number;
    name: string;
  };
};
