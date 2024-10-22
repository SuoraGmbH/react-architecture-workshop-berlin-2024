import { useEffect, useState } from "react";
import { Project } from "../../Harvest/Project/Project";
import { fetchProjects } from "../../Harvest/Project/fetchProjects";
import {
  createAuthenticatedHarvestClient,
  isProductionHarvestInstance,
} from "../../Harvest/harvestClient";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button.tsx";
import {
  createProject,
  fakeProject,
} from "../../Harvest/Project/createProject.ts";
import { createClient, fakeClient } from "../../Harvest/Client/createClient.ts";

export const ProjectsRoute = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjectList = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    const projects = await fetchProjects(authenticatedHarvestClient);
    setProjects(projects);
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const addSampleProject = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();

    const client = await createClient(authenticatedHarvestClient, fakeClient());

    await createProject(authenticatedHarvestClient, fakeProject(client.id));

    fetchProjectList();
  };

  // Start of Selection
  return (
    <div className="container mx-auto p-4">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Projects
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

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col md:flex-row justify-between items-start bg-white shadow rounded-lg p-4"
          >
            <div>
              <h2 className="text-lg font-semibold">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">
                Client: {project.client.name}
              </p>
              <p className="text-sm text-gray-600">
                {project.hourly_rate
                  ? `💸 Hourly Rate: $${project.hourly_rate}/hour`
                  : "No hourly rate"}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-gray-600">
                Updated: {new Date(project.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
