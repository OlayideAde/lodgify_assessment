// methods and locators for dashboard page
class DashboardPage {
  getActiveTab() {
    return cy.get('[data-test^="breadcrumb-item__name"]');
  }

  getSpacesSideMenu() {
    return cy.get('cu-tree[id^="cdk-drop-list"]');
  }

  getSpace(name) {
    return cy.get(
      `cu-tree[id^="cdk-drop-list"] > span[data-test="project-row__name__${name}"]`
    );
  }

  getFolder(name) {
    return cy.get(
      `cu-tree[id^="cdk-drop-list"] > span[data-test="category-row__folder-name__${name}"]`
    );
  }

  getFolderNameInput() {
    return cy.get("input#cu-create-category__name-input");
  }

  getCreateButton() {
    return cy.get("button").contains("Create");
  }

  getAddTaskButton() {
    return cy.get('button[data-test="create-task-menu__new-task-button"]')
  }

  getTaskTitleInput() {
    return cy.get('textarea[data="draft-view__title-task"]')
  }

  getCreateTaskButton() {
    return cy.get('button[data-test+"draft-view__quick-create-create"]')
  }

  getTaskList() {
    return cy.get('cu-task-list[data-test="list-view-divisions__task-list__to do"]')
  }

  getTask() {
    return cy.get('div[data-test="task-row_-container__test"]')
  }

  openCreateFolderForm(spaceName) {
    this.getSpace(spaceName).within(() => {
      cy.get(
        'div.row-actions > button[cutooltip="Create Folders, Lists, Docs and more"]'
      ).click();
    });

    cy.get(
      'cu-dropdown-list-item[data-pendo="cu-dropdown-list-item__id-new-folder"]'
    ).click();
  }

  openCreateListForm(folderName) {
    this.getFolder(folderName).within(() => {
      cy.get(
        'div.row-actions > button[cutolltip="Create Folders, Lists, Docs and more"]'
      );
    });

    cy.get(
      'cu-dropdown-list-item[data-pendo="cu-dropdown-list-item__id-new-list"]'
    ).click();
  }

  openSpace(name) {
    this.getSpace(name).click();
  }

  createFolder(spaceName, folderName) {
    this.getSpace(spaceName).within(() => {
      this.openCreateFolderForm();
    });
    this.getFolderNameInput().type(folderName);
    this.getCreateButton().click();
  }

  createTask(taskName) {
    this.getAddTaskButton().click()
    this.getTaskTitleInput().type(taskName)
    this.getCreateTaskButton().click()
  }

  userLogout() {
    cy.get(
      'button[data-test="user-main-settings-menu__dropdown-toggle"]'
    ).click();
    cy.get('button[data-test="dropdown-list-item__logout"]').click();
  }
}
export default DashboardPage;
