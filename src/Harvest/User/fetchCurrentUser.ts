import { AuthenticatedHarvestClient } from "../harvestClient";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  timezone: string;
  avatar_url: string;
};

export const fetchCurrentUser = async (
  authenticatedHarvestClient: AuthenticatedHarvestClient,
): Promise<User> => {
  const response = await authenticatedHarvestClient.get("users/me");
  return response.json<User>();
};
