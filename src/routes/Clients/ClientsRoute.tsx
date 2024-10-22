import { useEffect, useState } from "react";
import { Client } from "../../Harvest/Client/Client";
import { fetchClients } from "../../Harvest/Client/fetchClients";
import {
  createAuthenticatedHarvestClient,
  isProductionHarvestInstance,
} from "../../Harvest/harvestClient";
import { Link } from "react-router-dom";
import { createClient, fakeClient } from "../../Harvest/Client/createClient.ts";
import { Button } from "../../components/Button.tsx";

export const ClientsRoute = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClientList = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    const clients = await fetchClients(authenticatedHarvestClient);
    setClients(clients);
  };

  useEffect(() => {
    fetchClientList();
  }, []);

  const addSampleClient = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();

    await createClient(authenticatedHarvestClient, fakeClient());
    fetchClientList();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Clients
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {isProductionHarvestInstance() || (
            <Button
              text="Add Client"
              onClick={() => {
                addSampleClient();
              }}
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex flex-col md:flex-row justify-between items-start bg-white shadow rounded-lg p-4"
          >
            <div>
              <h2 className="text-lg font-semibold">
                <Link
                  to={`/clients/${client.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {client.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">
                Address: {client.address || "Not specified"}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-gray-600">
                Updated: {new Date(client.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
