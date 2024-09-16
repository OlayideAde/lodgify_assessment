import { ApiHelper, TestHelper } from "../../support/helpers";
import { DashboardPage } from "../../support/pages";

let spaceName;
let folderName;
let taskName;
let dashboard;
let listId;

const apiHelper = new ApiHelper();
const testHelper = new TestHelper();

describe("Test Scenarios", () => {
  before(() => {
    spaceName = testHelper.getRandomString();
    folderName = testHelper.getRandomString();

    dashboard = new DashboardPage();
  });

  describe('Validate "Create Space" functionality', () => {
    describe("Positive tests", () => {
      it("should create space via API and verify on UI", () => {
        // call createSpace API and verify response
        apiHelper.callCreateSpaceApi(spaceName).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(spaceName);
        });

        // login to dashboard and verify user is in workspace
        cy.testUserLogin();
        cy.url().should("contain", Cypress.env("WORKSPACE"));

        // verify spaceName is displayed in side menu
        dashboard.getSpacesSideMenu().within(() => {
          dashboard
            .getSpace(spaceName)
            .should("be.visible")
            .and("have.text", ` ${spaceName} `);
        });

        // open space and verify active tab
        dashboard.openSpace(spaceName);
        dashboard.getActiveTab().contains(spaceName).should("be.visible");

        // logout
        dashboard.userLogout();
      });
    });

    describe("Negative tests", () => {
      it("#API-test should verify that space name cannot be an empty string", () => {
        // call createSpace API and verify error
        apiHelper.callCreateSpaceApi("").then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.err).to.equal("Space name invalid");
          expect(response.body.ECODE).to.equal("PROJ_060");
        });
      });
    });
  });

  describe('Validate "Create Task" functionality', () => {
    describe("Positive tests", () => {
      beforeEach(() => {
        apiHelper.interceptCreateTask().as("createTask");
        apiHelper.interceptGetWidgets().as("getWidgets");
        taskName = testHelper.getRandomString(6);
      });

      it("should create task via UI and verify via API", () => {
        // login to dashboard and verify user is in workspace
        cy.testUserLogin();
        cy.url().should("contain", Cypress.env("WORKSPACE"));
        // open space
        dashboard.getSpace(spaceName).click();
        dashboard.getActiveTab().contains(spaceName).should("be.visible");

        // create folder in space
        dashboard.createFolder(spaceName, folderName);

        // create task in default list via ui
        dashboard.getFolder(folderName).click();
        cy.wait("@getWidgets");

        dashboard.createTask(taskName);
        //Verify task is on task list
        dashboard.getTaskList().within(() => {
          dashboard.getTaskByName(taskName).should("be.visible");
        });

        // intercept create task req
        cy.wait("@createTask").then((intercept) => {
          let taskId = intercept.response.body["id"];

          // call getTaskApi using id and verify response
          apiHelper.callGetTaskApi(taskId).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(taskId);
            expect(response.body.name).to.equal(taskName);

            // retrieve list id
            listId = response.body.list["id"];
            Cypress.env("LIST_ID", listId);
          });
        });

        // logout
        dashboard.userLogout();
      });

      it("should create task via API and verify on UI", () => {
        // call create task with list id and verify response
        apiHelper
          .callCreateTaskApi(taskName, Cypress.env("LIST_ID"))
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal(taskName);
          });

        // login to dashboard and verify user is in workspace
        cy.testUserLogin();
        cy.url().should("contain", Cypress.env("WORKSPACE"));

        // Open list
        dashboard.getFolder(folderName).click();
        dashboard.openListView();

        //Verify task is on task list
        dashboard.getTaskList().within(() => {
          dashboard.getTaskByName(taskName).should("be.visible");
        });

        // logout
        dashboard.userLogout();
      });
    });

    describe("Negative tests", () => {
      beforeEach(() => {
        apiHelper.interceptGetWidgets().as("getWidgets");
      });

      it("#UI-test should verify that task name is required", () => {
        // login to test user dashboard and verify user is in workspace
        cy.testUserLogin();
        cy.url().should("contain", Cypress.env("WORKSPACE"));

        // Open task list
        dashboard.getFolder(folderName).click();
        dashboard.openListView();
        // open addTask form
        dashboard.getAddTaskButton().click();
        dashboard.getCreateTaskForm().should("be.visible");
        dashboard.getTaskTitleInput().should("be.empty");
        dashboard.getCreateTaskButton().should("be.visible").click();

        // verfy dispalyed error message
        cy.get('[data-pendo="quick-create-task-enter-task-name-error"]')
          .should("contain", "Enter Task Name")
          .should("be.visible");

        dashboard.getCreateTaskForm().should("be.visible");
      });

      it("#API-test should verify that task name cannot be an empty string", () => {
        // call create task with list id and verify error
        apiHelper
          .callCreateTaskApi("", Cypress.env("LIST_ID"))
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.equal("Task name invalid");
            expect(response.body.ECODE).to.equal("INPUT_005");
          });
      });
    });
  });
});
