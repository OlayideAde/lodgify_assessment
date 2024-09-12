// methods and locators for login  page
class LoginPage {
    getEmailField() {
        return cy.get('#login-email-input')
    }

    getPasswordField() {
        return cy.get('#login-password-input')
    }

    getLoginButton() {
        return cy.get('button[data-test="login-submit"]').contains('Log In')
    }

    userLogin(username, password) {
        this.getEmailField().type(username)
        this.getPasswordField().type((password), { log: false })
        this.getLoginButton().click()
    }   
}
export default LoginPage