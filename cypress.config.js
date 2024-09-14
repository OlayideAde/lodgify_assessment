const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // get config file for test environment
      const testEnv = config.env.testEnv || 'local'
      const configFileName = `./configFiles/${testEnv}.config.json`

      const settings = require(configFileName)

      // set base url to config file baseUrl 
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      } else {
        config.baseUrl = 'https://app.clickup.com/login'
      }
      // get env variables from config file
      if(settings.env) {
        config.env = {
          ...config.env,
          ...settings.env
        }
      }
     
      return config
    },
    specPattern: 'cypress/e2e/tests/*.cy.js',
  },
  defaultCommandTimeout: 100000,
  pageLoadTimeout: 100000,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    embeddedScreenshots: true,
    inlineAssets:true
  },
});
