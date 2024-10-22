import { SearchParamsOption } from "ky";
import { AuthenticatedHarvestClient } from "../harvestClient";
import { Project } from "./Project";

type ProjectsResponse = {
  projects: Project[];
};

export const fetchProjects = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  clientId?: number,
): Promise<Project[]> => {
  const searchParams: SearchParamsOption = {};
  if (clientId) {
    searchParams.client_id = clientId;
  }

  const response = await authenticatedHarvestClient.get(`projects`, {
    searchParams,
  });

  const data = await response.json<ProjectsResponse>();

  return data.projects;
};
