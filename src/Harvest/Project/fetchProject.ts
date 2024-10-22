import { AuthenticatedHarvestClient } from "../harvestClient";
import { Project } from "./Project";

type ProjectResponse = Project;

export const fetchProject = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  projectId: string,
): Promise<Project> => {
  const response = await authenticatedHarvestClient.get(
    `projects/${projectId}`,
  );

  return response.json<ProjectResponse>();
};
