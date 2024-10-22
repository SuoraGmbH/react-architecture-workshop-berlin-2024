import React, { useEffect, useState, useMemo } from "react";
import { Project } from "../../Harvest/Project/Project";
import { TaskAssignment } from "../../Harvest/Task/TaskAssignment";
import { cn } from "../../util/cn";
import { fetchProjects } from "../../Harvest/Project/fetchProjects";
import { createAuthenticatedHarvestClient } from "../../Harvest/harvestClient";
import { fetchTaskAssignments } from "../../Harvest/Task/fetchTaskAssignments";
import {
  fetchRunningTimeEntry,
  TimeEntry,
} from "../../Harvest/TimeEntry/fetchRunningTimeEntry";
import { startTimer } from "../../Harvest/TimeEntry/startTimer";
import { stopTimer } from "../../Harvest/TimeEntry/stopTimer";

type TaskWithProject = TaskAssignment & {
  project: Project;
};

const useFilteredTasksWithProject = (search: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [taskAssignments, setTaskAssignments] = useState<TaskAssignment[]>([]);

  const fetchProjectData = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    const projects = await fetchProjects(authenticatedHarvestClient);
    setProjects(projects);
  };

  const fetchTaskAssignmentData = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    const taskAssignments = await fetchTaskAssignments(
      authenticatedHarvestClient,
    );
    setTaskAssignments(taskAssignments.task_assignments);
  };

  // Fetches the data ONCE after the initial render
  useEffect(() => {
    fetchProjectData();
    fetchTaskAssignmentData();
  }, []);

  const tasksWithProjects: TaskWithProject[] = taskAssignments
    .map((taskAssignment) => ({
      ...taskAssignment,
      project: projects.find((p) => p.id === taskAssignment.project.id),
    }))
    .filter((taskWithMaybeProject): taskWithMaybeProject is TaskWithProject =>
      Boolean(taskWithMaybeProject.project),
    );

  const filteredTasksWithProjects = tasksWithProjects.filter((task) =>
    task.task.name.toLowerCase().includes(search.toLowerCase()),
  );

  return { filteredTasksWithProjects };
};

// ==============

export const Raycast = () => {
  const [search, setSearch] = useState("");
  const { filteredTasksWithProjects } = useFilteredTasksWithProject(search);
  const [selectedTask, setSelectedTask] = useState<TaskWithProject | null>(
    null,
  );

  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState(0);
  const [activeTimeEntry, setActiveTimeEntry] = useState<TimeEntry | null>(
    null,
  );

  const fetchRunningTimeEntryData = async () => {
    const authenticatedHarvestClient = createAuthenticatedHarvestClient();
    const runningTimeEntry = await fetchRunningTimeEntry(
      authenticatedHarvestClient,
    );

    setActiveTimeEntry(runningTimeEntry);
  };

  useEffect(() => {
    fetchRunningTimeEntryData();
  }, []);

  const actions = useMemo(
    () => [
      {
        name: "Start Timer",
        action: async (task: TaskWithProject) => {
          const authenticatedHarvestClient = createAuthenticatedHarvestClient();
          await startTimer(authenticatedHarvestClient, {
            projectId: task.project.id,
            taskId: task.task.id,
          });

          fetchRunningTimeEntryData();
        },
      },
      {
        name: "Mark as Complete",
        action: () => {},
      },
      {
        name: "Stop Timer",
        action: async (task: TaskWithProject) => {
          if (!activeTimeEntry) {
            return;
          }

          if (task.id !== activeTimeEntry.task_assignment.id) {
            return;
          }

          const authenticatedHarvestClient = createAuthenticatedHarvestClient();
          await stopTimer(authenticatedHarvestClient, {
            timeEntryId: activeTimeEntry.id,
          });

          fetchRunningTimeEntryData();
        },
      },
    ],
    [activeTimeEntry],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!actionDropdownOpen || !selectedTask) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const currentIndex = filteredTasksWithProjects.findIndex(
            (task) => task.id === selectedTask?.id,
          );
          const nextIndex = Math.min(
            currentIndex + 1,
            filteredTasksWithProjects.length - 1,
          );
          setSelectedTask(filteredTasksWithProjects[nextIndex]);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const currentIndex = filteredTasksWithProjects.findIndex(
            (task) => task.id === selectedTask?.id,
          );
          const prevIndex = Math.max(currentIndex - 1, 0);
          setSelectedTask(filteredTasksWithProjects[prevIndex]);
        } else if (event.key === "Enter") {
          setActionDropdownOpen(true);
        }
      } else {
        if (event.key === "Escape") {
          setActionDropdownOpen(false);
        } else if (event.key === "Enter") {
          setActionDropdownOpen(false);
          actions[selectedActionIndex].action(selectedTask);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedActionIndex(
            (selectedActionIndex) => (selectedActionIndex + 1) % actions.length,
          );
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedActionIndex(
            (selectedActionIndex) =>
              (selectedActionIndex - 1 + actions.length) % actions.length,
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    filteredTasksWithProjects,
    selectedTask,
    actionDropdownOpen,
    actions.length,
    actions,
    selectedActionIndex,
  ]);

  return (
    <div className="p-2">
      {activeTimeEntry && (
        <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-blue-800">Active Task:</h2>
          <p className="mt-1 text-blue-700">{activeTimeEntry.task.name}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />
      <div>
        {filteredTasksWithProjects.map((task) => (
          <React.Fragment key={task.id}>
            {selectedTask?.id === task.id && actionDropdownOpen && (
              <div className="absolute z-10 w-48 p-1 mt-1 rounded-md bg-white shadow-lg right-4">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100",
                      selectedActionIndex === index && "bg-blue-500 text-white",
                    )}
                    onClick={() => action.action(selectedTask)}
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            )}
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className={cn(
                "p-2 rounded-md",
                selectedTask?.id === task.id && "bg-blue-500 text-white",
              )}
            >
              <div className="flex justify-between items-center w-full">
                <div>
                  {task.project.client.name} - {task.project.name} -{" "}
                  {task.task.name}
                </div>
                {activeTimeEntry &&
                  activeTimeEntry.task.id === task.task.id && (
                    <div className="text-xs text-green-800 bg-green-100 p-2 rounded-md">
                      🕧 Active Task
                    </div>
                  )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
