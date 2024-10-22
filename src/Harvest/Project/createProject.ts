import { Project } from "./Project.ts";
import { AuthenticatedHarvestClient } from "../harvestClient.ts";
import { faker } from "@faker-js/faker";

interface CreateProjectRequest {
  client_id: number;
  name: string;
  is_billable: boolean;
  hourly_rate?: number;
}

type CreateProjectResponse = Project;

export const fakeProject = (clientId: number): CreateProjectRequest => {
  const isBillable = Math.random() > 0.5;

  return {
    client_id: clientId,
    name: faker.company.buzzPhrase(),
    is_billable: isBillable,
    hourly_rate: isBillable
      ? faker.number.int({ min: 50, max: 200, multipleOf: 5 })
      : undefined,
  };
};

export const createProject = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  request: CreateProjectRequest,
): Promise<CreateProjectResponse> => {
  const response = await authenticatedHarvestClient.post("projects", {
    json: {
      ...request,
      bill_by: "Project",
      budget_by: "project",
    },
  });

  return await response.json<Project>();
};
