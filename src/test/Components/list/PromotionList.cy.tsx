import React, { useState } from 'react';
import PromotionList from '@/components/list/PromotionList';
import { IPromotion } from '@/models/Promotions';

describe('<PromotionList />', () => {
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState(false);

  it('renders', () => {
    cy.mount(
      <PromotionList
        promotions={promotions}
        setPromotions={setPromotions}
        isLoading={isLoading}
        error={error}
      />,
    );
  });
  it('should have a table', () => {
    cy.mount(
      <PromotionList
        promotions={promotions}
        setPromotions={setPromotions}
        isLoading={isLoading}
        error={error}
      />,
    );
    cy.get('table').should('exist');
  });
  it('should have a button', () => {
    cy.mount(
      <PromotionList
        promotions={promotions}
        setPromotions={setPromotions}
        isLoading={isLoading}
        error={error}
      />,
    );
    cy.get('button').should('exist');
  });
  it('should have a error', () => {
    cy.mount(
      <PromotionList
        promotions={promotions}
        setPromotions={setPromotions}
        isLoading={isLoading}
        error={error}
      />,
    );
    cy.get('span').should('exist');
  });
});
