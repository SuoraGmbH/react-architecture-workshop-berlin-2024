import { http, HttpResponse } from "msw";

export const projectTaskAssignmentsEmptyHandler = http.get(
  "https://api.harvestapp.com/v2/projects/:projectId/task_assignments",
  () => {
    return HttpResponse.json({ task_assignments: [] });
  },
);
