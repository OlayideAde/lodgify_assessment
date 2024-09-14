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
    spaceName = testHelper.getRandomString()
    folderName = testHelper.getRandomString()
    taskName = testHelper.getRandomString(6)

    dashboard = new DashboardPage()
  });

  describe('Validate "Create Space" functionality', () => {
    describe("Positive tests", () => {
      it("should create space via API and verify on UI", () => {
        // call createSpace API
        apiHelper.callCreateSpaceApi(spaceName).then((response) => {
          // verify response status code
          expect(response.status).to.equal(200)
          expect(response.body.name).to.equal(spaceName)
        });

        // login to dashboard
        cy.testUserLogin();
        // verify user is in workspace
        cy.url().should('contain', Cypress.env('WORKSPACE'))


        // verify spaceName is displayed in side menu
        dashboard.getSpacesSideMenu().within(() => {
          dashboard.getSpace(spaceName).should("be.visible");
          dashboard.getSpace(spaceName).should("have.text", ` ${spaceName} `);
        });

        // open space
        dashboard.openSpace(spaceName);
        // verify that the selected space tab is open
        dashboard.getActiveTab().contains(spaceName).should("be.visible");

        // logout 
        dashboard.userLogout();
      });
    });

    describe("Negative tests", () => {
      it("#API-test should verify that space name is required", () => {
        // call createSpace API
        apiHelper.callCreateSpaceApi("").then((response) => {
          // verify response status and error
          expect(response.status).to.equal(400);
          expect(response.body.err).to.equal("Space name invalid");
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
        // login to test user dashboard
        cy.testUserLogin();
        // verify user is in workspace
        cy.url().should('contain', Cypress.env('WORKSPACE'))

        // create folder in space
        dashboard.createFolder(spaceName, folderName);

        // create task in default list via ui
        dashboard.getFolder(folderName).click();
       
        cy.wait(1000);
        dashboard.createTask(taskName);

        // retrieve list id from url
        cy.url().then((url) => {
          listId = url.split('/').pop()
          Cypress.env('LIST_ID', listId )
        })

        //verify notification modal
        //dashboard
        //  .getNotificationText()
        //  .should("have.text", `${taskName} Created!`);

        cy.wait("@createTask").then((intercept) => {
          let taskId = intercept.response.body["id"];

          // call getTaskApi using id and verify
          apiHelper.callGetTaskApi(taskId).then((response) => {
            // verify response
            cy.log(response)
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(taskId);
            expect(response.body.name).to.equal(taskName);
          });
        });
      });

      it("should create task via API and verify on UI", () => {
        // call create task with list id and verify response
        listId = Cypress.env("LIST_ID")
        apiHelper
          .callCreateTaskApi(taskName,listId)
          .then((response) => {
            cy.log(response.body);
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal(taskName);
          });

        // login to dashboard
        cy.testUserLogin();
        // verify user is in workspace
        cy.url().should('contain', Cypress.env('WORKSPACE'))

        // Open folder in space
        dashboard.getFolder(folderName).click();

        //Verify task is on task list
        dashboard.getTaskList().within(() => {
          dashboard.getTask().contains(taskName).should("be.visible");
        });
      });
    });

    describe("Negative tests", () => {
      it("#UI-test should verify that task name is required", () => {
        // login to test user dashboard
        cy.testUserLogin();
        // verify user is in workspace
        cy.url().should('contain', Cypress.env('WORKSPACE'))

        //Get folder
        dashboard.getFolder(folderName).click();
        // create task with empty string as name
        dashboard.createTask("");

        // verfy dispalyed error message
        cy.get('[data-pendo="quick-create-task-enter-task-name-error"]')
          .should("contain", "Enter Task Name")
          .should("be.visible");
      });

      it("#API-test should verify that task name is required", () => {
        // call create task with list id and verify response
        apiHelper
          .callCreateTaskApi("", Cypress.env("LIST"))
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.err).to.equal("");
          });
      });
    });
  });
});
