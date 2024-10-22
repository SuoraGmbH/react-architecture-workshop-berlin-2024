import { AuthenticatedHarvestClient } from "../harvestClient";
import { Client } from "./Client";

type ClientsResponse = {
  clients: Client[];
};

export const fetchClients = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
): Promise<Client[]> => {
  const response = await authenticatedHarvestClient.get("clients");
  const data = await response.json<ClientsResponse>();

  return data.clients;
};
