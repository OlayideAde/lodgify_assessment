import ApiHelper from "../helpers/apiHelper";
import TestHelper from "../helpers/testHelper";
import DashboardPage from "../pageObjects/dashboard";

let spaceName;
let folderName;
let taskName;
let dashboard;

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
        // call createSpace API
        apiHelper.callCreateSpaceApi(spaceName).then((response) => {
          // verify response status code
          expect(response.status).to.equal(200);
        });

        // login to dashboard
        cy.testUserLogin();

        // verify spaceName is displayed in side menu
        dashboard.getSpacesSideMenu().within(() => {
          dashboard.getSpace(spaceName).should("be.visible");
          dashboard.getSpace(spaceName).should("have.value", spaceName);
        });

        // open space
        dashboard.openSpace(spaceName);
        // verify that the selected space tab is open
        dashboard.getActiveTab().contains(spaceName).should("be.visible");

        // logout for next test
        dashboard.userLogout();
      });
    });
  });

  describe('Validate "Create Task" functionality', () => {
    describe("Positive tests", () => {
      beforeEach(() => {
        apiHelper.interceptGetLists().as("getLists");
        apiHelper.interceptCreateTask().as("createTask");
      });
      
      it("should create task via UI and verify via API", () => {
        // login to test user dashboard
        cy.testUserLogin();

        // create folder in space
        dashboard.createFolder(spaceName, folderName);

        // create task in default list via ui
        dashboard.getFolder(folderName).click();
        dashboard.createTask(taskName);

        //verify notification modal
        dashboard
          .getNotificationText()
          .should("have.text", `${taskName} Created!`);

        cy.wait("@createTask").then((intercept) => {
          let taskId = intercept.response.body["id"];

          // call getTaskApi using id and verify
          apiHelper.callGetTaskApi(taskId).then((response) => {
            // verify response
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(taskId);
            expect(response.body.name).to.equal(taskName);
          });
        });

        dashboard.userLogout();
      });

      it("should create task via API tand verify on UI", () => {
        cy.wait("@getLists").then((intercept) => {
          // get existing list id
          let listId = intercept.response.body.lists[0]["id"];

          // call create task with list id and verify response
          apiHelper.callCreateTaskApi(taskName, listId).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal(taskName);
          });
        });

        // login to dashboard
        cy.testUserLogin();

        // Open folder in space
        dashboard.getFolder(folderName).click();

        //Verify task is on task list
        dashboard.getTaskList().within(() => {
          dashboard.getTask().contains(taskName).should("be.visible");
        });
      });
    });
  });
});
