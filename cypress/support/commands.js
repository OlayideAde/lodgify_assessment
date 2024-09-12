import LoginPage from "../e2e/pageObjects/login"

const login = new LoginPage();

Cypress.Commands.add('testUserLogin', () => {
    const email = Cypress.env('LOGIN.EMAIL')
    const password = Cypress.env('LOGIN.PASSWORD')
    //visit login page
    cy.visit('/')
    // login for test user
    login.userLogin(email, password)  
})

// override api requests to accept authorization header
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    const optionsObject = options[0];

    if (optionsObject === Object(optionsObject)) {
        optionsObject.headers = {
          Authorization: `${Cypress.env('AUTHORIZATION_TOKEN')}`,
          ...optionsObject.headers,
        };
    
        return originalFn(optionsObject);
      }
    
      return originalFn(...options);
    });