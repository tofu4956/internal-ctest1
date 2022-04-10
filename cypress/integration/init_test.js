describe('Check has header', () => { 
  it('page has header', () => {
    cy.visit("http://localhost:3000")
    cy.get("header")
    cy.contains('Title')
  })
})