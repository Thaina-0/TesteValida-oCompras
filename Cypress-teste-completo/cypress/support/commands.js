Cypress.Commands.add('login', () => {
  cy.fixture('usuario').then((usuario) => {
    cy.get('[data-test="username"]').type(usuario.usuario)
    cy.get('[data-test="password"]').type(usuario.senha)
    cy.get('[data-test="login-button"]').click()
  })
})