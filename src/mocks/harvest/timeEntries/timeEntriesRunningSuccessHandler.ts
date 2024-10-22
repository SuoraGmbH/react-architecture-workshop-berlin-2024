import { http, HttpResponse } from "msw";

export const timeEntriesRunningSuccessHandler = http.get(
  "https://api.harvestapp.com/v2/time_entries",
  () => {
    return HttpResponse.json({
      time_entries: [
        {
          id: 2498812751,
          spent_date: "2024-10-21",
          hours: 2.45,
          hours_without_timer: 0.0,
          rounded_hours: 2.45,
          notes: null,
          is_locked: false,
          locked_reason: null,
          is_closed: false,
          is_billed: false,
          timer_started_at: "2024-10-21T12:30:46Z",
          started_time: "2:30pm",
          ended_time: null,
          is_running: true,
          billable: true,
          budgeted: true,
          billable_rate: 100.0,
          cost_rate: null,
          created_at: "2024-10-21T12:30:46Z",
          updated_at: "2024-10-21T12:30:46Z",
          user: {
            id: 4825036,
            name: "Hans-Christian Otto",
          },
          client: {
            id: 14562237,
            name: "Example Client",
            currency: "EUR",
          },
          project: {
            id: 39467980,
            name: "Example Project",
            code: null,
          },
          task: {
            id: 21849643,
            name: "Programming",
          },
          user_assignment: {
            id: 439659985,
            is_project_manager: true,
            is_active: true,
            use_default_rates: true,
            budget: null,
            created_at: "2023-12-29T19:17:47Z",
            updated_at: "2023-12-29T19:17:47Z",
            hourly_rate: null,
          },
          task_assignment: {
            id: 424475612,
            billable: true,
            is_active: true,
            created_at: "2023-12-29T19:17:47Z",
            updated_at: "2023-12-29T19:17:47Z",
            hourly_rate: 100.0,
            budget: null,
          },
          invoice: null,
          external_reference: null,
        },
      ],
      per_page: 2000,
      total_pages: 1,
      total_entries: 1,
      next_page: null,
      previous_page: null,
      page: 1,
      links: {
        first:
          "https://api.harvestapp.com/v2/time_entries?is_running=true&page=1&per_page=2000&ref=first",
        next: null,
        previous: null,
        last: "https://api.harvestapp.com/v2/time_entries?is_running=true&page=1&per_page=2000&ref=last",
      },
    });
  },
);
