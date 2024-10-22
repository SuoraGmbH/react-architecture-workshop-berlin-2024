import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../Harvest/Project/Project";
import { fetchProject } from "../../Harvest/Project/fetchProject";
import { createAuthenticatedHarvestClient } from "../../Harvest/harvestClient";
import { fetchTaskAssignmentsForProject } from "../../Harvest/Task/fetchTaskAssignments";
import { TaskAssignment } from "../../Harvest/Task/TaskAssignment";

export const ProjectRoute = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [taskAssignments, setTaskAssignments] = useState<TaskAssignment[]>([]);

  useEffect(() => {
    if (!projectId) {
      return;
    }
    setIsLoading(true);

    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    fetchProject(authenticatedHarvestClient, projectId)
      .then((project) => {
        setProject(project);
      })
      .finally(() => {
        setIsLoading(false);
      });

    fetchTaskAssignmentsForProject(authenticatedHarvestClient, projectId).then(
      (taskAssignments) => {
        setTaskAssignments(taskAssignments);
      },
    );
  }, [projectId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-2/3">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Details</h2>
            <p className="text-gray-600">Client: {project.client.name}</p>
            <p className="text-gray-600">
              Hourly Rate:{" "}
              {project.hourly_rate
                ? `$${project.hourly_rate}/hour`
                : "Not specified"}
            </p>
            <p className="text-gray-600">
              Notes: {project.notes || "No notes"}
            </p>
            <p className="text-gray-600">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Last Updated: {new Date(project.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Task Assignments</h2>
            {taskAssignments.length > 0 ? (
              <ul className="space-y-4">
                {taskAssignments.map((task) => (
                  <li key={task.id} className="border-b pb-2">
                    <h3 className="font-medium">{task.task.name}</h3>
                    <p className="text-sm text-gray-600">
                      Billable: {task.billable ? "Yes" : "No"}
                    </p>
                    {task.hourly_rate ? (
                      <p className="text-sm text-gray-600">
                        Hourly Rate: ${task.hourly_rate}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">
                        No hourly rate specified
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No task assignments for this project.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
