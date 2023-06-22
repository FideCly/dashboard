import React from 'react';
import PromotionList from '@/Components/List/PromotionList';

describe('<PromotionList />', () => {
  it('renders', () => {
    cy.mount(<PromotionList />);
  });
  it('should have a table', () => {
    cy.mount(<PromotionList />);
    cy.get('table').should('exist');
  });
  it('should have a button', () => {
    cy.mount(<PromotionList />);
    cy.get('button').should('exist');
  });
  it('should have a error', () => {
    cy.mount(<PromotionList />);
    cy.get('span').should('exist');
  });
});
