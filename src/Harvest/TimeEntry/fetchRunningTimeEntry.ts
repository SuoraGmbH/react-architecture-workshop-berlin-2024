import { AuthenticatedHarvestClient } from "../harvestClient";
export type TimeEntry = {
  id: number;
  user: {
    id: number;
    name: string;
  };

  task_assignment: {
    id: number;
  };
  task: {
    id: number;
    name: string;
  };

  project: {
    id: number;
    name: string;
  };

  client: {
    id: number;
    name: string;
  };
};

type TimeEntriesResponse = {
  time_entries: TimeEntry[];
};

export const fetchRunningTimeEntry = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
): Promise<TimeEntry | null> => {
  const response = await authenticatedHarvestClient.get(
    "time_entries?is_running=true",
  );

  const responseData = await response.json<TimeEntriesResponse>();

  return responseData.time_entries[0] ?? null;
};
