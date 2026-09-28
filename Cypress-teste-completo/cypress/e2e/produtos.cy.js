describe('Produtos', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.login()
  })

  it('Deve exibir a lista de produtos', () => {

    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('contain', 'Products')

    cy.get('[data-test="inventory-item"]')
      .should('have.length.greaterThan', 0)
  })

  it('Deve adicionar o Sauce Labs Backpack ao carrinho', () => {

    cy.contains(
      '[data-test="inventory-item"]',
      'Sauce Labs Backpack'
    )
      .find('button')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('contain', '1')

    cy.get('[data-test="shopping-cart-link"]')
      .click()

    cy.contains('Sauce Labs Backpack')
      .should('be.visible')
  })

  it('Deve adicionar dois produtos ao carrinho', () => {

    cy.contains(
      '[data-test="inventory-item"]',
      'Sauce Labs Backpack'
    )
      .find('button')
      .click()

    cy.contains(
      '[data-test="inventory-item"]',
      'Sauce Labs Bike Light'
    )
      .find('button')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('contain', '2')

    cy.get('[data-test="shopping-cart-link"]')
      .click()

    cy.contains('Sauce Labs Backpack')
      .should('be.visible')

    cy.contains('Sauce Labs Bike Light')
      .should('be.visible')
  })

})