import { LoginPage } from "./pages";

Cypress.Commands.add("testUserLogin", () => {
  const login = new LoginPage();

  const email = Cypress.env("EMAIL");
  const password = Cypress.env("PASSWORD");
  //visit login page
  cy.visit("/");
  // login for test user
  login.userLogin(email, password);
});

// override api requests to use same authorization header
Cypress.Commands.overwrite("request", (originalFn, ...options) => {
  const optionsObject = options[0];

  if (optionsObject === Object(optionsObject)) {
    optionsObject.headers = {
      Authorization: `${Cypress.env("AUTHORIZATION_TOKEN")}`,
      ...optionsObject.headers,
    };

    return originalFn(optionsObject);
  }

  return originalFn(...options);
});
