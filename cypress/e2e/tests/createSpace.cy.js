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

    dashboard = new DashboardPage()
    
  });

  describe('Validate "Create space" functionality', () => {
    it("should create space via API and verify on UI", () => {
        // call create space API
        apiHelper.callCreateSpaceApi(spaceName).then((response) => {
            // verify response status code
            expect(response.status).to.equal(200)
        })
        
      // login to integration user UI dashboard
      cy.testUserLogin();

      // verify spaceName is displayed in sidebar
      dashboard.viewSpacesSideBar()
      dashboard.getSpacesSideBar().then(() => {

        // verify name is displayed there
      })

      // open space and verify it is open  
      dashboard.openSpace(spaceName)

      //verify space on UI check spacename ui

    });

    after()
  });

  describe('Validate "Create task" functionality', () => {
    it("should create task via UI and verify via API", () => {
      // login to test user dashboard
      cy.testUserLogin()
      
      // create folder in space
      dashboard.createFolder(folderName)
      // create list in folder
      dashboard.createList(listName)
      // create task via ui
      dashboard.createTask()

      // call get task api and verify details


    
    });

    it("should create task via API tand verify on UI", () => {
      // call create task api


      // login to integration user UI dashboard
      cy.testUserLogin();

      // navigate to spaces

      //verify space on UI check spacename ui

      //intercept api to check if spacename there
    });

    after()
  });
});
