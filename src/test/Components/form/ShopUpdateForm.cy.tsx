import React from 'react'
import { ShopUpdateForm } from '@/Components/form/ShopForm'
import { IShop } from '@/Api/Models/Shop'

describe('<ShopUpdateForm />', () => {
  const shop: IShop = {
    id: 1,
    companyName: 'test',
    address: 'test',
    phone: 'test',
    email: 'test',
    siren: 'test',
    siret: 'test',
    zipCode: '',
    lat: '',
    long: '',
    city: ''
  }
  it('renders', () => {
    cy.mount(<ShopUpdateForm shop={shop} />)
  })
  it('should have a form', () => {
    cy.mount(<ShopUpdateForm shop={shop} />)
    cy.get('form').should('exist')
  })
  it('should have a error if empty field', () => {
    cy.mount(<ShopUpdateForm shop={shop} />)
    cy.get('form').submit()
    cy.get('span').should('exist')
  })
})
