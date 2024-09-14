let requestPayload;
let options;

const apiBaseUrl = "https://app.clickup.com/api/v2";
class ApiHelper {
  callCreateSpaceApi(spaceName) {
    requestPayload = {
      name: spaceName,
      multiple_assignees: true,
      features: {
        due_dates: {
          enabled: true,
          start_date: false,
          remap_due_dates: true,
          remap_closed_due_date: false,
        },
        time_tracking: {
          enabled: false,
        },
        tags: {
          enabled: true,
        },
        time_estimates: {
          enabled: true,
        },
        checklists: {
          enabled: true,
        },
        custom_fields: {
          enabled: true,
        },
        remap_dependencies: {
          enabled: true,
        },
        dependency_warning: {
          enabled: true,
        },
        portfolios: {
          enabled: true,
        },
      },
    };

    options = {
      method: "POST",
      url: `${apiBaseUrl}/team/${Cypress.env("WORKSPACE")}/space`,
      body: requestPayload,
      failOnStatusCode: false,
    };

    return cy.request(options);
  }

  callCreateTaskApi(taskName, listId) {
    requestPayload = {
      name: taskName,
    };

    options = {
      method: "POST",
      url: `${apiBaseUrl}/list/${listId}/task`,
      body: requestPayload,
      failOnStatusCode: false,
    };

    return cy.request(options);
  }

  callGetTaskApi(taskId) {
    options = {
      method: "GET",
      url: `${apiBaseUrl}/task/${taskId}`,
    };

    return cy.request(options);
  }

  interceptCreateTask() {
    return cy.intercept({
      method: "POST",
      url: "**/tasks/v1/subcategory/**/task",
    });
  }
}

export default ApiHelper;
