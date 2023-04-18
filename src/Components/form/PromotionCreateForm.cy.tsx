import React from 'react'
import { PromotionCreateForm } from './PromotionForm'
import { IPromotions } from '@/Api/Models/Promotions'

describe('<PromotionCreateForm />', () => {
  const promotion : IPromotions = {
    name: 'test',
    id: 0,
    shopId: 0,
    checkoutLimit: 0,
    endAt: new Date(),
  }
  it('renders', () => {
    cy.mount(<PromotionCreateForm />)
  })
  it('should have a form', () => {
    cy.mount(<PromotionCreateForm />)
    cy.get('form').should('exist')
  })
  it('should have a error if empty field', () => {
    cy.mount(<PromotionCreateForm />)
    cy.get('form').submit()
    cy.get('span').should('exist')
  })
  it('should return 201 if sucess', () => {
    cy.mount(<PromotionCreateForm />)
    cy.get('form').submit()
    cy.intercept('POST',Cypress.env('api_server')+'/promotion', {
      statusCode: 201,
      body: {promotion}
    })
  })
})
