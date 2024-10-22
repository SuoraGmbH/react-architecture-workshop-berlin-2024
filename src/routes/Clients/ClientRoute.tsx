import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "../../Harvest/Client/Client";
import { fetchClient } from "../../Harvest/Client/fetchClient";
import {
  createAuthenticatedHarvestClient,
  isProductionHarvestInstance,
} from "../../Harvest/harvestClient";
import { fetchProjects } from "../../Harvest/Project/fetchProjects";
import { Project } from "../../Harvest/Project/Project";
import { Button } from "../../components/Button.tsx";
import {
  createProject,
  fakeProject,
} from "../../Harvest/Project/createProject.ts";

export const ClientRoute = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const fetchClientData = async (clientId: number) => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();

    setIsLoading(true);
    try {
      const client = await fetchClient(authenticatedHarvestClient, clientId);
      setClient(client);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectList = async (clientId: number) => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();

    setIsProjectsLoading(true);
    try {
      const projects = await fetchProjects(
        authenticatedHarvestClient,
        clientId,
      );
      setProjects(projects);
    } finally {
      setIsProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (!clientId) {
      return;
    }

    fetchClientData(Number(clientId));
    fetchProjectList(Number(clientId));
  }, [clientId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>Client not found</div>;
  }

  const addSampleProject = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    await createProject(authenticatedHarvestClient, fakeProject(client.id));
    fetchProjectList(client.id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {client.name}
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {isProductionHarvestInstance() || (
            <Button
              text="Add Project"
              onClick={() => {
                addSampleProject();
              }}
            />
          )}
        </div>
      </div>

      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-1/2">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Client Details</h2>
            <p className="text-gray-600">
              Address: {client.address || "Not specified"}
            </p>
            <p className="text-gray-600">
              Created: {new Date(client.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Last Updated: {new Date(client.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            {isProjectsLoading ? (
              <div>Loading...</div>
            ) : projects.length > 0 ? (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a
                      href={`/projects/${project.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No projects found for this client.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
