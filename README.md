# lodgify_assessment_repo

This repo contains the test cases for test scenarios outlined in the [lodgify assessment task](https://lodgify.notion.site/Lodgify-Junior-Automation-QA-Challenge-28b56dfc7d59474fa85dae2ebebbd191). 
## Getting started
# Folder Structure With Descriptions
/cypress |  | The automated testing framework
--- | --- | --- | 
| /e2e |
--- | --- | --- | 
.gitignore | | Git ignored files
--- | --- | --- | 
 package.json | | Scripts and libraries
--- | --- | --- | 
 cypress.config.js | | Cypress configurations
--- | --- | --- | 
/.github. | /workflows | Github actions configurations

## Cloning the repository

Open your terminal and type:

```
git clone git@github.com:OlayideAde/lodgify_assessment.git
```

## Setup

- Install node > 15
- Run `npm install` to install dpendencies

## Local setup
You can run the tests using your own ClickUp account configurations. To do this, you will need to create a local configFile with your own details. 
- Create a file under `/configFiles/` and name it local.config.json 
- Add all required properties as is detailed in the `/configFiles/prod.config.json`

## Run tests
- To run tests without any local setup using the prod configfFile available in this repo run this command `npm run run-prod-tests`
- To run tests using you local config file (refer to local setup) run this command `npm run run-tests`
