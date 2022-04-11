/* eslint-disable no-undef */
describe('Check has checkbox', () => { 
  it('page has header', () => {
    cy.visit("http://localhost:3000")
    cy.get("input")
    cy.contains('北海道')
    cy.contains("東京都")
  })
  it("checkbox can check", ()=>{
    cy.get('[type="checkbox"]').first().check()
    cy.get('[type="checkbox"]').first().uncheck()
    cy.get('#7').check()
    cy.get('#7').uncheck()
  })
  it("checkbox is coveraged 47 types", ()=> {
    cy.get('[type="checkbox"]')
    .its("length")
    .should("eq", 47)
  })
})