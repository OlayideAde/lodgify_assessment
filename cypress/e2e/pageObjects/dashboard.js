// methods and locators for dashboard page
class DashboardPage {
  getActiveTab() {
    return cy.get('[data-test^="breadcrumb-item__name"]');
  }

  getSpacesSideMenu() {
    return cy.get('[id^="cdk-drop-list"]');
  }

  getSpace(name) {
    return cy.get("cu-project-row.sidebar-project-row").contains(name);
  }

  getFolder(name) {
    return cy.get("cu-category-row.sidebar-category-row").contains(name);
  }

  getFolderNameInput() {
    return cy.get("input#cu-create-category__name-input");
  }

  getCreateButton() {
    return cy.get('.cu-modal__footer > [buttontype="primary"]').contains('Create')
  }

  getAddTaskButton() {
    return cy.get('.cu2-views-bar__create-cu-object-button > .ng-trigger > [data-test="cu2-views-bar__create-menu-view-bar-collapsed"] > .container > [data-test="create-task-menu__new-task-button"]')
  }

  getTaskTitleInput() {
    return cy.get('[data-test="draft-view__title-task"]')
  }

  getCreateTaskButton() {
    return cy.get('button[data-test="draft-view__quick-create-create"]');
  }

  getTaskList() {
    return cy.get(
      'cu-task-list[data-test="list-view-divisions__task-list__to do"]'
    );
  }

  getTask() {
    return cy.get('div[data-test="task-row_-container__test"]');
  }

  getCreateTaskForm() {
    return cy.get('[data-test="draft-view__container"]');
  }

  getNotificationText() {
    return cy.get('[data-test="toast__name-link"]');
  }

  openCreateFolderForm(spaceName) {
    this.getSpace(spaceName).invoke("show");

    cy.get(`button[data-test="project-row__ellipsis__${spaceName}"]`).click();
    cy.get("a.nav-menu-item_create-new").click();
    cy.get('[data-pendo="cu-dropdown-list-item__id-new-folder"]').click();
  }

  openCreateListForm(folderName) {
    this.getFolder(folderName).invoke("show");

    cy.get(`button[data-test="project-row__ellipsis__${spaceName}"]`).click();

    cy.get(
      'cu-dropdown-list-item[data-pendo="cu-dropdown-list-item__id-new-list"]'
    ).click();
  }

  openSpace(name) {
    this.getSpace(name).click();
  }

  createFolder(spaceName, folderName) {
    this.openCreateFolderForm(spaceName);
    this.getFolderNameInput().type(folderName);
    this.getCreateButton().click();
  }

  createTask(taskName) {
    cy.get('[data-test="data-view-list__header-item-name-List"]').click();

    this.getAddTaskButton().click();
    this.getCreateTaskForm().should('be.visible')
    cy.wait(5000)
    this.getTaskTitleInput().type(taskName);
    this.getCreateTaskButton().click();
  }

  userLogout() {
    cy.get(
      'button[data-test="user-main-settings-menu__dropdown-toggle"]'
    ).click();
    cy.get('button[data-test="dropdown-list-item__logOut"]').click();
  }
}
export default DashboardPage;
