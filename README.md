# lodgify_assessment_repo

This repo contains the test cases for test scenarios outlined in the [lodgify assessment task](https://lodgify.notion.site/Lodgify-Junior-Automation-QA-Challenge-28b56dfc7d59474fa85dae2ebebbd191). 

### Built With
The automation project was done with Cypress, using Page Objects Model. Dependencies include cypress-mochawesome-reporter is to generate report files for test runs and cypress-terminal-report which prints results of cypress commands to the terminal. 

## Getting started
### Folder Structure With Descriptions

|                   |                 |                                                                                          |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------- |
| /cypress          |                 | The automated testing framework                                                          |
|                   | /e2e            | Contains all the tests                                                                   |
|                   | /support/pages  | Contains page object module                                                              |
|                   | /support/helper | Contains helper module                                                                   |
|                   | /support        | Contains the logic of the tests                                                          |
| .gitignore        |                 | Git ignored files                                                                        |
| /.github.         | /workflows      | Github actions configurations                                                            |
| cypress.config.js |                 | [Cypress configurations](https://docs.cypress.io/api/cypress-api/config)                 |
| package.json      |                 | Scripts and libraries                                                                    |

To get a local copy up and running follow these steps 

## Setup
- Install node > 15
- Run `npm install` to install dpendencies

## Cloning the repository

Open your terminal and type:

```
git clone git@github.com:OlayideAde/lodgify_assessment.git
```

## Local setup
You can run the tests using your own ClickUp account configurations. To do this, you will need to create a local configFile with your own details. 
- Create a file under `/configFiles/` and name it local.config.json 
- Add all required properties as is detailed in the `/configFiles/prod.config.json`

## Run tests
- To run tests without any local setup using the prod configfFile available in this repo run this command `npm run run-prod-tests`
- To run tests using you local config file (refer to local setup) run this command `npm run run-tests`

## Runnin the tests in the pipeline with Github Actions
Github workflow is triggered to run all tests automatically on push to master and when a PR is opened. (see `github/workflows/run_tests_ci.yaml`).
Workflow runs can be viewed in the `Actions` tab of the repository on github.
Test report artifacts are available to download after test run is completed, by following these steps:
1. Open `Actions` tab to view recent workflow runs and select one.
2. On the `Summary` page for the workflow run, if the run is completed, the test report artifact named `testReport` will be avilable to download
