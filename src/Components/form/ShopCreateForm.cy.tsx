import React from 'react'
import { ShopCreateForm } from './ShopForm'

describe('<ShopForm />', () => {
  it('renders', () => {
    cy.mount(<ShopCreateForm />)
  })
  it('should have a form', () => {
    cy.mount(<ShopCreateForm />)
    cy.get('form').should('exist')
  })
  it('should have a error if empty field', () => {
    cy.mount(<ShopCreateForm />)
    cy.get('form').submit()
    cy.get('span').should('exist')
  })
  it('should return 201 if sucess', () => {
    cy.mount(<ShopCreateForm />)
    cy.get('form').submit()
    cy.intercept('POST', Cypress.env('api_server')+"/shop", {
      statusCode: 201,
    })
  })
})
