// methods and locators for dashboard page
class DashboardPage {
  viewSpacesButton() {
    return cy.get('button[data-test="sidebar-space__browse-button"]');
  }

  getSpacesSideBar() {
    return cy.get("cu-tree#cdk-drop-list-42");
  }

  getSpace(name) {
    return cy.get(
      `cu-tree#cdk-drop-list-42 > cdk-tree-node > cu-project-row[data-test="project-list-bar-item__link__${name}"]`
    );
  }

  getFolderNameInput() {
    return cy.get("input#cu-create-category__name-input");
  }

  getCreateButton() {
    return cy.get("button").contains("Create");
  }

  openCreateFolderForm() {
    cy.get(
      'div.row-actions > button[cutolltip="Create Folders, Lists, Docs and more"]'
    );
    cy.get(
      'cu-dropdown-list-item[data-pendo="cu-dropdown-list-item__id-new-folder"]'
    ).click();
  }

  openCreateListForm() {
    cy.get(
      'div.row-actions > button[cutolltip="Create Folders, Lists, Docs and more"]'
    );
    cy.get(
      'cu-dropdown-list-item[data-pendo="cu-dropdown-list-item__id-new-list"]'
    ).click();
  }

  getListNameInput() {
    return cy.get("input[data-test=simple-input-modal__label]");
  }

  //getList() {
  //  return cy.get('')
 // }

  getActiveTab() {
    return cy.get('[data-test^="breadcrumb-item__name"]')
  }

  viewSpacesSideBar() {
    this.viewSpacesButton().click();
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

  userLogout() {
    cy.get(
      'button[data-test="user-main-settings-menu__dropdown-toggle"]'
    ).click();
    cy.get('button[data-test="dropdown-list-item__logout"]').click();
  }
}
export default DashboardPage;
