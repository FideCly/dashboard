import React from 'react';
import { Login } from '@/Components/auth/Auth';

describe('<Login />', () => {
  it('renders', () => {
    cy.mount(<Login />);
  });
});
