import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { LoginScreen } from "./Auth/LoginScreen.tsx";
import { Credentials, fetchCredentials } from "./Auth/credentialsStorage.ts";
import { useEffect, useState } from "react";
import { fetchCurrentUser, User } from "./Harvest/User/fetchCurrentUser.ts";
import { createHarvestClientForCredentials } from "./Harvest/harvestClient.ts";

export const App = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCredentials().then(setCredentials);
  }, []);

  useEffect(() => {
    if (credentials === null) {
      return;
    }

    fetchCurrentUser(createHarvestClientForCredentials(credentials)).then(
      setCurrentUser,
    );
  }, [credentials]);

  if (credentials === null || currentUser === null) {
    return <LoginScreen onLogin={setCredentials} />;
  }

  return <RouterProvider router={router} />;
};
