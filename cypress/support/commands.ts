/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.setCookie('accessToken', 'access-token');
  window.localStorage.setItem('refreshToken', 'refresh-token');

  const BURGER_API_URL = Cypress.env('BURGER_API_URL');

  cy.intercept(`${BURGER_API_URL}/auth/user`, { fixture: 'user' }).as('authUser');
  cy.intercept(`${BURGER_API_URL}/ingredients`, { fixture: 'ingredients' }).as('getIngredients');
  cy.intercept(`${BURGER_API_URL}/orders/all`, { fixture: 'feed' }).as('getFeed');
  cy.intercept(`${BURGER_API_URL}/orders`, { fixture: 'orders' }).as('getUserOrders');

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
