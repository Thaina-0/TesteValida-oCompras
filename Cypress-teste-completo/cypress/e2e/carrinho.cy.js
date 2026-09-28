describe('Carrinho', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')

    cy.login()

    cy.contains(
      '[data-test="inventory-item"]',
      'Sauce Labs Backpack'
    )
      .find('button')
      .click()

    cy.get('[data-test="shopping-cart-link"]')
      .click()
  })

  it('Deve exibir o produto adicionado', () => {

    cy.contains('Sauce Labs Backpack')
      .should('be.visible')
  })

  it('Deve remover um produto do carrinho', () => {

    cy.get('[data-test="remove-sauce-labs-backpack"]')
      .click()

    cy.contains('Sauce Labs Backpack')
      .should('not.exist')

    cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
  })

})