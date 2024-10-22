import { http, HttpResponse } from "msw";

export const projectSuccessHandler = http.get(
  "https://api.harvestapp.com/v2/projects/:projectId",
  () => {
    return HttpResponse.json({
      id: 39467980,
      name: "Example Project",
      code: null,
      is_active: true,
      is_billable: true,
      is_fixed_fee: false,
      bill_by: "Project",
      budget: 50.0,
      budget_by: "project",
      budget_is_monthly: false,
      notify_when_over_budget: false,
      over_budget_notification_percentage: 80.0,
      show_budget_to_all: true,
      created_at: "2023-12-29T19:17:47Z",
      updated_at: "2023-12-29T19:17:47Z",
      starts_on: null,
      ends_on: null,
      over_budget_notification_date: null,
      notes:
        "This is an example project to help you trial Harvest. You can track time to this project and see what insights you can get from our reports! Feel free to make any edits you want to this project or even delete it.",
      cost_budget: null,
      cost_budget_include_expenses: false,
      hourly_rate: 100.0,
      fee: null,
      client: {
        id: 14562237,
        name: "Example Client",
        currency: "EUR",
      },
    });
  },
);
