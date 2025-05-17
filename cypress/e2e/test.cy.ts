describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });  

  afterEach(() => {
    cy.logout();
  });

  it('authorizes the user', () => {
    cy.get('[data-cy="profile-name"]').should('contain', 'Иван Иванов');
  });

  describe('Adding ingredients', () => {
    it('adds bun', () => {
      cy.get('[data-cy="burger-constructor"]').should('contain', 'Выберите булки');

      cy.get('[data-cy="ingredient-bun"] button').first().click();
      
      cy.get('[data-cy="burger-constructor"]').as('constructor').should('not.contain', 'Выберите булки');
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('adds main', () => {
      cy.get('[data-cy="burger-constructor"]').should('contain', 'Выберите начинку');

      cy.get('[data-cy="ingredient-main"] button').first().click();
      
      cy.get('[data-cy="burger-constructor"]').as('constructor').should('not.contain', 'Выберите начинку');
      cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
      
    });

    it('adds sauce', () => {
      cy.get('[data-cy="burger-constructor"]').should('contain', 'Выберите начинку');

      
      cy.get('[data-cy="ingredient-sauce"] button').first().click();
      
      cy.get('[data-cy="burger-constructor"]').as('constructor').should('not.contain', 'Выберите начинку');
      cy.get('@constructor').should('contain', 'Соус Spicy-X');
    });
  });

  describe('Ingredient modal', () => {
    beforeEach(() => {
      cy.get('[data-cy="modal"]').should('not.exist');
      
      cy.get('[data-cy="ingredient-bun"] img').first().click();

      cy.get('[data-cy="modal"]').as('modal').should('contain', 'Детали ингредиента');
    });

    it('opens', () => {
      cy.get('@modal').should('contain', 'Краторная булка N-200i');
    });

    it('closes with button', () => {
      cy.get('[data-cy="modal"] button').click();

      cy.get('@modal').should('not.exist');
    });

    it('closes with overlay', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('@modal').should('not.exist');
    });
  });
  
  it('makes order', () => {
    cy.intercept('POST', `${Cypress.env('BURGER_API_URL')}/orders`, { fixture: 'order.json' }).as('makeOrder');

    cy.get('[data-cy="ingredient-bun"] button').first().click();
    cy.get('[data-cy="ingredient-main"] button').first().click();
    cy.get('[data-cy="ingredient-sauce"] button').first().click();

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.contains('Оформить заказ').click();
    cy.wait('@makeOrder');
  
    cy.get('[data-cy="modal"]').as('modal').should('exist');
    cy.get('[data-cy="modal"] .text_type_digits-large').should('contain', '77627');
    cy.get('[data-cy="modal"] button').click();

    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="burger-constructor"]').as('constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');
  });
});
