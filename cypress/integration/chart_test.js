/* eslint-disable no-undef */
describe('Check Chart can be rendered properly', () => { 
  it('page has header', () => {
    cy.visit("http://localhost:3000")
    cy.get(".recharts-responsive-container")
  })
  it('element can be rendered properly', () => {
    cy.get('[type="checkbox"]').first().check() 
    cy.get(".recharts-line")
  })
  it('element can be rendered in multiple lines', () => {
    cy.get('#11').check()
    cy.get("#7").check()
    cy.get(".recharts-line")
    .its("length")
    .should("eq", 3)
  })
})