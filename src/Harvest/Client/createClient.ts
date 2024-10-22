import { Client } from "./Client.ts";
import { AuthenticatedHarvestClient } from "../harvestClient.ts";
import { faker } from "@faker-js/faker";

interface CreateClientRequest {
  name: string;
  address?: string;
}

type CreateClientResponse = Client;

export const fakeClient = (): CreateClientRequest => {
  return {
    name: faker.company.name(),
    address: `${faker.location.streetAddress()}, ${faker.location.zipCode()} ${faker.location.city()}, ${faker.location.country()}`,
  };
};

export const createClient = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  request: CreateClientRequest,
): Promise<CreateClientResponse> => {
  const response = await authenticatedHarvestClient.post("clients", {
    json: request,
  });

  return await response.json<Client>();
};
