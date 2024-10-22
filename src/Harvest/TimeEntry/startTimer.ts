import { TimeEntry } from "./fetchRunningTimeEntry";
import { AuthenticatedHarvestClient } from "../harvestClient";

type Params = {
  projectId: number;
  taskId: number;
};

const ymd = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export const startTimer = async (
  harvestClient: AuthenticatedHarvestClient,
  { projectId, taskId }: Params,
) => {
  const response = await harvestClient.post("time_entries", {
    json: {
      project_id: projectId,
      task_id: taskId,
      spent_date: ymd(new Date()),
    },
  });

  return await response.json<TimeEntry>();
};
