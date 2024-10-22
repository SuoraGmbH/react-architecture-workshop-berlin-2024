import ky from "ky";
import { Credentials } from "../Auth/credentialsStorage";

export const createHarvestClient = () =>
  ky.create({
    prefixUrl: "https://api.harvestapp.com/v2",
  });

export type AuthenticatedHarvestClient = ReturnType<
  typeof createAuthenticatedHarvestClient
>;

export const createHarvestClientForCredentials = (credentials: Credentials) => {
  return createHarvestClient().extend({
    headers: {
      Authorization: `Bearer ${credentials.harvestAccessToken}`,
      "Harvest-Account-ID": credentials.harvestAccountId,
    },
  });
};

export const createAuthenticatedHarvestClient = () => {
  return createHarvestClientForCredentials({
    harvestAccountId: import.meta.env.VITE_HARVEST_ACCOUNT_ID,
    harvestAccessToken: import.meta.env.VITE_HARVEST_API_KEY,
  });
};

export const isProductionHarvestInstance = () =>
  import.meta.env.VITE_HARVEST_ACCOUNT_ID === "823161";
