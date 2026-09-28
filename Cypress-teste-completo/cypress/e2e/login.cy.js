describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Deve realizar login com sucesso', () => {

    cy.fixture('usuario').then((usuario) => {

      cy.get('[data-test="username"]')
        .type(usuario.usuario)

      cy.get('[data-test="password"]')
        .type(usuario.senha)

      cy.get('[data-test="login-button"]')
        .click()

      cy.url()
        .should('include', '/inventory.html')

      cy.get('[data-test="title"]')
        .should('contain', 'Products')
    })
  })

  it('Não deve permitir login com senha incorreta', () => {

    cy.fixture('usuario').then((usuario) => {

      cy.get('[data-test="username"]')
        .type(usuario.usuario)

      cy.get('[data-test="password"]')
        .type('senha_errada')

      cy.get('[data-test="login-button"]')
        .click()

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username and password do not match')
    })
  })

  it('Não deve permitir login sem preencher os campos', () => {

    cy.get('[data-test="login-button"]')
      .click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })

})