import { AuthenticatedHarvestClient } from "../harvestClient";
import { TaskAssignment } from "./TaskAssignment";

type TaskAssignmentsResponse = {
  task_assignments: TaskAssignment[];
};

export const fetchTaskAssignments = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
): Promise<TaskAssignmentsResponse> => {
  const response = await authenticatedHarvestClient.get("task_assignments");
  return response.json<TaskAssignmentsResponse>();
};

export const fetchTaskAssignmentsForProject = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  projectId: string,
): Promise<TaskAssignment[]> => {
  const response = await authenticatedHarvestClient.get(
    `projects/${projectId}/task_assignments`,
  );
  const responseData = await response.json<TaskAssignmentsResponse>();

  return responseData.task_assignments;
};
