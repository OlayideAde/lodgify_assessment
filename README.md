# lodgify_assessment_repo

This repo contains the test cases outlined in the lodgify assessment task. 

## Cloning the repository

Open your terminal and type:

```
git clone git@github.com:OlayideAde/lodgify_assessment.git
```

## Setup

- Install node > 15
- Run `npm install`

## Local setup
You can run the tests using your own ClickUp account configurations. To do this, you will need to create a local configFile with your own details. 
- Create a file under '/configFiles/` and name it local.config.json 
- Add all required properties as is detailed in the `/configFiles/prod.config.json`

## Run tests
- To run tests without any local setup using the prod configfFile run this command `npm run run-prod-tests`
- To run tests using you local setup config file run this command `npm run run-tests`
