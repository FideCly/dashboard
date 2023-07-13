import React from 'react';
import { Register } from '@/Components/auth/Auth';
import { IUserAuthPayload } from '@/Models/User';

describe('<Register />', () => {
  const user: IUserAuthPayload = {
    role: 'Fider',
    email: 'test',
    password: 'test',
  };
  it('renders', () => {
    cy.mount(<Register />);
  });
  it('should have a form', () => {
    cy.mount(<Register />);
    cy.get('form').should('exist');
  });
  it('should have a error if empty field', () => {
    cy.mount(<Register />);
    cy.get('form').submit();
    cy.get('span').should('exist');
  });
  it('should redirect to /login if sucess', () => {
    cy.mount(<Register />);
    cy.get('form').submit();
    cy.intercept('POST', Cypress.env('api_server') + '/auth/register', {
      statusCode: 201,
      body: { user },
    });
    cy.get('span').should('exist');
  });
});
