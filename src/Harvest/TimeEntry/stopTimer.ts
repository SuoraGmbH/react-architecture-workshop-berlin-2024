import { TimeEntry } from "./fetchRunningTimeEntry";
import { AuthenticatedHarvestClient } from "../harvestClient";

type Params = {
  timeEntryId: number;
};

export const stopTimer = async (
  harvestClient: AuthenticatedHarvestClient,
  { timeEntryId }: Params,
) => {
  const response = await harvestClient.patch(
    `time_entries/${timeEntryId}/stop`,
  );

  return await response.json<TimeEntry>();
};
