describe('Checkout', () => {

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

    cy.get('[data-test="checkout"]')
      .click()
  })

  it('Deve realizar uma compra com sucesso', () => {

    cy.fixture('usuario').then((usuario) => {

      cy.get('[data-test="firstName"]')
        .type(usuario.nome)

      cy.get('[data-test="lastName"]')
        .type(usuario.sobrenome)

      cy.get('[data-test="postalCode"]')
        .type(usuario.cep)

      cy.get('[data-test="continue"]')
        .click()

      cy.get('[data-test="title"]')
        .should('contain', 'Checkout: Overview')

      cy.get('[data-test="finish"]')
        .click()

      cy.get('[data-test="complete-header"]')
        .should('be.visible')
        .and('contain', 'Thank you for your order!')
    })
  })

  it('Não deve continuar sem informar o nome', () => {

    cy.get('[data-test="lastName"]')
      .type('Lima')

    cy.get('[data-test="postalCode"]')
      .type('45600-000')

    cy.get('[data-test="continue"]')
      .click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required')
  })

  it('Não deve continuar sem informar o sobrenome', () => {

    cy.get('[data-test="firstName"]')
      .type('Anthony')

    cy.get('[data-test="postalCode"]')
      .type('45600-000')

    cy.get('[data-test="continue"]')
      .click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Last Name is required')
  })

  it('Não deve continuar sem informar o CEP', () => {

    cy.get('[data-test="firstName"]')
      .type('Anthony')

    cy.get('[data-test="lastName"]')
      .type('Lima')

    cy.get('[data-test="continue"]')
      .click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Postal Code is required')
  })

})