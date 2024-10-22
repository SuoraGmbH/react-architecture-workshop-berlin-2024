import { AuthenticatedHarvestClient } from "../harvestClient";
import { Client } from "./Client";

export const fetchClient = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
  clientId: number,
): Promise<Client> => {
  const response = await authenticatedHarvestClient.get(`clients/${clientId}`);
  const data = await response.json<Client>();

  return data;
};
