import ApiHelper from "../helpers/apiHelper";
import TestHelper from "../helpers/testHelper";
import DashboardPage from "../pageObjects/dashboard";

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
    taskName = testHelper.getRandomString(6);

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
          dashboard.getSpace(spaceName).should("be.visible").and("have.text", ` ${spaceName} `);
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
        dashboard.createTask(taskName);

        //verify notification modal
        // dashboard
        // .getNotificationText()
        // .should("have.value", `${taskName} Created!`);

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
        taskName = testHelper.getRandomString(6);
        // call create task with list id and verify response
        apiHelper
          .callCreateTaskApi(taskName, Cypress.env("LIST_ID"))
          .then((response) => {
            cy.log(response.body);
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
          dashboard.getTaskByName(taskName).should('be.visible')
        });

        // logout
        dashboard.userLogout();
      });
    });

    describe("Negative tests", () => {
      it("#UI-test should verify that task name is required", () => {
        // login to test user dashboard
        cy.testUserLogin();
        // verify user is in workspace
        cy.url().should("contain", Cypress.env("WORKSPACE"));

        // Open task list
        dashboard.getFolder(folderName).click();
        dashboard.openListView();
        // open addTask form
        dashboard.getAddTaskButton().click();
        dashboard.getCreateTaskForm().should("be.visible");
        cy.wait(5000);
        dashboard.getCreateTaskButton().click();

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
            expect(response.status).to.equal(400)
            expect(response.body.err).to.equal("Task name invalid")
            expect(response.body.ECODE).to.equal("INPUT_005");
          });
      });
    });
  });
});
