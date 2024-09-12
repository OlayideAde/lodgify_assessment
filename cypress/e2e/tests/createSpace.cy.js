import ApiHelper from "../helpers/apiHelper";
import TestHelper from "../helpers/testHelper";
import DashboardPage from "../pageObjects/dashboard";

let spaceName
let folderName
let listName
let taskName
let dashboard

const apiHelper = new ApiHelper();
const testHelper = new TestHelper();

describe('Validate "Create space" API functionality', () => {
  before(() => {
    spaceName = testHelper.getRandomString()
    folderName = testHelper.getRandomString()
    taskName = testHelper.getRandomString(6)

    dashboard = new DashboardPage() 
  });

  describe('Validate "Create space" functionality', () => {
    it("should create space via API and verify on UI", () => {
        // call create space API
        apiHelper.callCreateSpaceApi(spaceName).then((response) => {
            // verify response status code
            expect(response.status).to.equal(200)
        })
        
      // login to dashboard
      cy.testUserLogin();

      // verify spaceName is displayed in sidebar
      dashboard.viewSpacesSideBar()
      dashboard.getSpacesSideBar().within(() => {
        (dashboard.getSpace(spaceName)).should('be.visible')
      })

      // open space 
      dashboard.openSpace(spaceName)
      // verify that the selected space tab is open
      dashboard.getActiveTab().contains(spaceName).should('be.visible')

      dashboard.userLogout()
    });
  });

  describe('Validate "Create task" functionality', () => {
    it("should create task via UI and verify via API", () => {
      // login to test user dashboard
      cy.testUserLogin()
      
      // create folder in space
      dashboard.createFolder(spaceName, folderName)

      // get default list in folder

      // create task via ui
      //dashboard.createTask()

      // call get task api and verify details

      // apiHelper.callGetTaskApi().then((response) => {
        // verify response status code
        //expect(response.status).to.equal(200)
    })

    it("should create task via API tand verify on UI", () => {
      // call create task api


      // login to integration user UI dashboard
      // cy.testUserLogin();

      // navigate to spaces

      //verify space on UI check spacename ui

      //intercept api to check if spacename there
    });

  });
});
