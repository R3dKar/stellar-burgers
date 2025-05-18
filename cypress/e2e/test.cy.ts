describe('Burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });  

  afterEach(() => {
    cy.logout();
  });

  const burgerConstructor = '[data-cy="burger-constructor"]';

  const bunAddButton = '[data-cy="ingredient-bun"] button';
  const mainAddButton = '[data-cy="ingredient-main"] button';
  const sauceAddButton = '[data-cy="ingredient-sauce"] button';

  const modal = '[data-cy="modal"]';
  const modalClose = `${modal} button`;

  it('authorizes the user', () => {
    cy.get('[data-cy="profile-name"]').should('contain', 'Иван Иванов');
  });

  describe('Adding ingredients', () => {
    it('adds bun', () => {
      cy.get(burgerConstructor).should('contain', 'Выберите булки');

      cy.get(bunAddButton).first().click();
      
      cy.get(burgerConstructor).as('constructor').should('not.contain', 'Выберите булки');
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('adds main', () => {
      cy.get(burgerConstructor).should('contain', 'Выберите начинку');

      cy.get(mainAddButton).first().click();
      
      cy.get(burgerConstructor).as('constructor').should('not.contain', 'Выберите начинку');
      cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
      
    });

    it('adds sauce', () => {
      cy.get(burgerConstructor).should('contain', 'Выберите начинку');

      
      cy.get(sauceAddButton).first().click();
      
      cy.get(burgerConstructor).as('constructor').should('not.contain', 'Выберите начинку');
      cy.get('@constructor').should('contain', 'Соус Spicy-X');
    });
  });

  describe('Ingredient modal', () => {
    beforeEach(() => {
      cy.get(modal).should('not.exist');
      
      cy.get('[data-cy="ingredient-bun"] img').first().click();

      cy.get(modal).as('modal').should('contain', 'Детали ингредиента');
    });

    it('opens', () => {
      cy.get('@modal').should('contain', 'Краторная булка N-200i');
    });

    it('closes with button', () => {
      cy.get(modalClose).click();

      cy.get('@modal').should('not.exist');
    });

    it('closes with overlay', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('@modal').should('not.exist');
    });
  });
  
  it('makes order', () => {
    cy.intercept('POST', `${Cypress.env('BURGER_API_URL')}/orders`, { fixture: 'order.json' }).as('makeOrder');

    cy.get(bunAddButton).first().click();
    cy.get(mainAddButton).first().click();
    cy.get(sauceAddButton).first().click();

    cy.get(modal).should('not.exist');

    cy.contains('Оформить заказ').click();
    cy.wait('@makeOrder');
  
    cy.get(modal).as('modal').should('exist');
    cy.get(`${modal} .text_type_digits-large`).should('contain', '77627');
    cy.get(modalClose).click();

    cy.get('@modal').should('not.exist');

    cy.get(burgerConstructor).as('constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');
  });
});
