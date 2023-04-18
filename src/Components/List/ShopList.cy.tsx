import React from 'react'
import ShopList from './ShopList'

describe('<ShopList />', () => {
  it('renders', () => {
    cy.mount(<ShopList />)
  })
  it('should have a table', () => {
    cy.mount(<ShopList />)
    cy.get('table').should('exist')
  })
  it('should have a button', () => {
    cy.mount(<ShopList />)
    cy.get('button').should('exist')
  })
  it('should have a error', () => {
    cy.mount(<ShopList />)
    cy.get('span').should('exist')
  })
})
