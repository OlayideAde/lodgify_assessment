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

