describe('promotion spec', () => {
    beforeEach(()=>{

        cy.visit('http://localhost:3000/promotion')
    })
    it('can load Promotionlist', () => {
        // should be able to find the shoplist component
        cy.get('[data-cy=PromotionList]').should('exist')
    })
    it('can add a new promotion', () => {
        cy.get('[data-cy=add-promotion]').click()
        // should be able to find the promotion form component
        cy.get('[data-cy=promotion-form]').should('exist')
        // fill in the form
        cy.get('[data-cy=promotion-name]').type('promotion name')
        cy.get('[data-cy=promotion-address]').type('promotion address')
        cy.get('[data-cy=promotion-phone]').type('promotion phone')
        cy.get('[data-cy=promotion-email]').type('promotion email')
        cy.get('[data-cy=submit]').click()
    })
    it('click on modify promotion in list', ()=>{
        
    })
})
export {};
