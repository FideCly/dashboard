import React from 'react'
import { PromotionUpdateForm } from '@/Components/form/PromotionForm'
import { IPromotions } from '@/Api/Models/Promotions'

describe('<PromotionUpdateForm />', () => {
  const promotion : IPromotions = {
    name: 'test',
    id: 0,
    shopId: 0,
    checkoutLimit: 0,
    endAt: new Date(),
  }
  it('renders', () => {
    cy.mount(<PromotionUpdateForm promotion={promotion} />)
  })
  it('should have a form', () => {
    cy.mount(<PromotionUpdateForm promotion={promotion} />)
    cy.get('form').should('exist')
  })
  it('should have a error if empty field', () => {
    cy.mount(<PromotionUpdateForm promotion={promotion} />)
    cy.get('form').submit()
    cy.get('span').should('exist')
  })
})
