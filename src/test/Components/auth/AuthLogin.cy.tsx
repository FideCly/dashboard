import React from 'react'
import { Login } from '@/Components/auth/Auth'
import Router from 'next/router'

describe('<Login />', () => {
  it('renders', () => {
    cy.mount(<Login />)
  })
})

