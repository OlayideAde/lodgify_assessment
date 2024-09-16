// methods and locators for login  page
export class LoginPage {
  getEmailField() {
    return cy.get("#login-email-input");
  }

  getPasswordField() {
    return cy.get("#login-password-input");
  }

  getLoginButton() {
    return cy.get('button[data-test="login-submit"]').contains("Log In");
  }

  getLoginForm() {
    return cy.get('[data-test="login__main-container"]');
  }

  userLogin(username, password) {
    this.getLoginForm().should('be.visible');
    this.getEmailField().type(username);
    this.getPasswordField().type(password, { log: false });
    this.getLoginButton().click();
  }
}
