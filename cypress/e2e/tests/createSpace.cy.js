import ApiHelper from "../helpers/apiHelper";
import TestHelper from "../helpers/testHelper";
import DashboardPage from "../pageObjects/dashboard";

let spaceName;
let folderName;
let taskName;
let dashboard;

const apiHelper = new ApiHelper();
const testHelper = new TestHelper();

describe('Validate "Create space" API functionality', () => {
  before(() => {
    spaceName = testHelper.getRandomString();
    folderName = testHelper.getRandomString();
    taskName = testHelper.getRandomString(6);

    dashboard = new DashboardPage();

    apiHelper.interceptGetLists().as("getLists");
    apiHelper.interceptCreateTask().as("createTask");
  });

  describe('Validate "Create space" functionality', () => {
    it("should create space via API and verify on UI", () => {
      // call create space API
      apiHelper.callCreateSpaceApi(spaceName).then((response) => {
        // verify response status code
        expect(response.status).to.equal(200);
      });

      // login to dashboard
      cy.testUserLogin();

      // verify spaceName is displayed in side menu
      dashboard.getSpacesSideMenu().within(() => {
        dashboard.getSpace(spaceName).should("be.visible");
      });

      // open space
      dashboard.openSpace(spaceName);
      // verify that the selected space tab is open
      dashboard.getActiveTab().contains(spaceName).should("be.visible");

      dashboard.userLogout();
    });
  });

  describe('Validate "Create task" functionality', () => {
    it("should create task via UI and verify via API", () => {
      // login to test user dashboard
      cy.testUserLogin();

      // create folder in space
      dashboard.createFolder(spaceName, folderName);

      // create task in default list via ui
      dashboard.getFolder(folderName).click()
      dashboard.createTask(taskName)

      //verify
      cy.wait("@createTask").should(({ response }) => {
        let taskId = response.body.id;

        // call getTaskApi using id and verify
        apiHelper.callGetTaskApi(taskId).then((response) => {
          // verify response
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(taskId);
          expect(response.body.name).to.equal(taskName);
        });
      });
    });

    it("should create task via API tand verify on UI", () => {
       cy.wait("@getLists").should(({ response }) => {
        // get existing list id
        let listId = response.body.lists[0].id;

        // call create task with list id
        apiHelper.callCreateTaskApi(taskName, listId).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(taskName);
        });
      });

      // login to dashboard
      cy.testUserLogin();

      // open space
      dashboard.openSpace(spaceName);

      //verify space on UI check spacename ui

      //intercept api to check if spacename there
    });
  });
});
