describe('burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });  

  afterEach(() => {
    cy.logout();
  });

  it('loads the page', () => {});
});
