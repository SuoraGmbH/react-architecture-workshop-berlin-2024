import { http, HttpResponse } from "msw";

export const taskAssignmentsSuccessHandler = http.get(
  "https://api.harvestapp.com/v2/task_assignments",
  () => {
    return HttpResponse.json({
      task_assignments: [
        {
          id: 424475613,
          billable: true,
          is_active: true,
          created_at: "2023-12-29T19:17:47Z",
          updated_at: "2023-12-29T19:17:47Z",
          hourly_rate: null,
          budget: null,
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849645,
            name: "Project Management",
          },
        },
        {
          id: 424475612,
          billable: true,
          is_active: true,
          created_at: "2023-12-29T19:17:47Z",
          updated_at: "2023-12-29T19:17:47Z",
          hourly_rate: null,
          budget: null,
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849643,
            name: "Programming",
          },
        },
        {
          id: 424475611,
          billable: true,
          is_active: true,
          created_at: "2023-12-29T19:17:47Z",
          updated_at: "2023-12-29T19:17:47Z",
          hourly_rate: null,
          budget: null,
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849644,
            name: "Marketing",
          },
        },
        {
          id: 424475610,
          billable: true,
          is_active: true,
          created_at: "2023-12-29T19:17:47Z",
          updated_at: "2023-12-29T19:17:47Z",
          hourly_rate: null,
          budget: null,
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849642,
            name: "Design",
          },
        },
        {
          id: 424475609,
          billable: false,
          is_active: true,
          created_at: "2023-12-29T19:17:47Z",
          updated_at: "2023-12-29T19:17:47Z",
          hourly_rate: null,
          budget: null,
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849646,
            name: "Business Development",
          },
        },
      ],
      per_page: 2000,
      total_pages: 1,
      total_entries: 5,
      next_page: null,
      previous_page: null,
      page: 1,
      links: {
        first:
          "https://api.harvestapp.com/v2/task_assignments?page=1&per_page=2000&ref=first",
        next: null,
        previous: null,
        last: "https://api.harvestapp.com/v2/task_assignments?page=1&per_page=2000&ref=last",
      },
    });
  },
);
