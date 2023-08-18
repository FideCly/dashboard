import React, { useState } from 'react';
import { PromotionCreateForm } from '@/components/form/Promotion.form';
import { IPromotion } from '@/models/Promotions';

describe('<PromotionCreateForm />', () => {
  const promotion: IPromotion = {
    name: 'test',
    id: 0,
    shopId: 0,
    checkoutLimit: 0,
    endAt: new Date(),
    isActive: true,
  };

  const [, setIsShown] = useState(false);
  const [promotions, setPromotions] = useState<IPromotion[]>([promotion]);

  it('renders', () => {
    cy.mount(
      <PromotionCreateForm
        promotions={promotions}
        setPromotions={setPromotions}
        setShown={setIsShown}
      />,
    );
  });
  it('should have a form', () => {
    cy.mount(
      <PromotionCreateForm
        promotions={promotions}
        setPromotions={setPromotions}
        setShown={setIsShown}
      />,
    );
    cy.get('form').should('exist');
  });
  it('should have a error if empty field', () => {
    cy.mount(
      <PromotionCreateForm
        promotions={promotions}
        setPromotions={setPromotions}
        setShown={setIsShown}
      />,
    );
    cy.get('form').submit();
    cy.get('span').should('exist');
  });
  it('should return 201 if sucess', () => {
    cy.mount(
      <PromotionCreateForm
        promotions={promotions}
        setPromotions={setPromotions}
        setShown={setIsShown}
      />,
    );
    cy.get('form').submit();
    cy.intercept('POST', Cypress.env('api_server') + '/promotion', {
      statusCode: 201,
      body: { promotion },
    });
  });
});
