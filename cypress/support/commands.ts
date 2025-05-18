/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.setCookie('accessToken', 'access-token');
  window.localStorage.setItem('refreshToken', 'refresh-token');

  const BURGER_API_URL = Cypress.env('BURGER_API_URL');

  cy.intercept('GET', `${BURGER_API_URL}/auth/user`, { fixture: 'user.json' }).as('authUser');
  cy.intercept('GET', `${BURGER_API_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('GET', `${BURGER_API_URL}/orders/all`, { fixture: 'feed.json' }).as('getFeed');
  cy.intercept('GET', `${BURGER_API_URL}/orders`, { fixture: 'orders.json' }).as('getUserOrders');

  cy.wait(['@authUser', '@getIngredients', '@getFeed', '@getUserOrders']);
});

Cypress.Commands.add('logout', () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});


declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    logout(): Chainable<void>;
  }
}
