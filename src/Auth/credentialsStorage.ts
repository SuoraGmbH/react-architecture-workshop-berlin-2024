export type Credentials = {
  harvestAccountId: string;
  harvestAccessToken: string;
};

export const fetchCredentials = async (): Promise<Credentials | null> => {
  const harvestAccountId = localStorage.getItem("harvestAccountId");
  const harvestAccessToken = localStorage.getItem("harvestAccessToken");

  if (harvestAccountId === null || harvestAccessToken === null) {
    return null;
  }

  return { harvestAccountId, harvestAccessToken };
};

export const clearCredentials = async (): Promise<void> => {
  localStorage.removeItem("harvestAccountId");
  localStorage.removeItem("harvestAccessToken");
};

export const setCredentials = async (
  harvestAccountId: string,
  harvestAccessToken: string,
): Promise<void> => {
  localStorage.setItem("harvestAccountId", harvestAccountId);
  localStorage.setItem("harvestAccessToken", harvestAccessToken);
};
