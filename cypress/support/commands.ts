/// <reference types="cypress" />

import { CREATE_USER } from "../locators/createUser/createUserLocator";
import { HOME } from "../locators/home/homeLocator";
import { LOGIN } from "../locators/login/loginLocator";
import { CreateUserModel } from "../models/createUser.model";

Cypress.Commands.add("createNewUser", (user: CreateUserModel) => {
  cy.visit("/create/user");
  cy.get(CREATE_USER.INPUT_NAME)
    .should("be.visible")
    .type(user.name);
  cy.get(CREATE_USER.INPUT_EMAIL)
    .should("be.visible")
    .type(user.email);
  cy.get(CREATE_USER.INPUT_USERNAME)
    .should("be.visible")
    .type(user.username);
  cy.get(CREATE_USER.INPUT_PASSWORD)
    .should("be.visible")
    .type(user.password);
  cy.get(CREATE_USER.BTN_SAVE)
    .should("be.visible")
    .click({ force: true });
  cy.get(CREATE_USER.MODAL_MESSAGE)
    .should("be.visible")
    .and("contain.text", "Parabéns, seu usuário foi criado com sucesso.")
})

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/");

  cy.get(LOGIN.INPUT_USERNAME)
    .should("be.visible")
    .type(username);

  cy.get(LOGIN.INPUT_PASSWORD)
    .should("be.visible")
    .type(password);

  cy.get(LOGIN.BTN_ACCESS)
    .should("be.visible")
    .click({ force: true });

  cy.get(HOME.DIV_RESULTS_CONTAINER)
    .should("be.visible");
})

Cypress.Commands.add("createNewRecord", (title: string, username: string, password: string) => {
  cy.contains(HOME.BUTTON_CREATE_RECORD)
    .should("be.visible")
    .click({ force: true });

  cy.get(HOME.RECORD_INPUTS)
    .eq(0)
    .should("be.visible")
    .clear()
    .type(title);

  cy.get(HOME.RECORD_INPUTS)
    .eq(1)
    .should("be.visible")
    .clear()
    .type(username);

  cy.get(HOME.RECORD_INPUTS)
    .eq(2)
    .should("be.visible")
    .clear()
    .type(password);

  cy.contains(HOME.RECORD_BUTTON_REGISTER)
    .should("be.visible")
    .click({ force: true });

  cy.get(HOME.MESSAGE_MODEL)
    .should("be.visible")
    .and("contain.text", "Registro criado com sucesso.");
})

// setado para que o cypress valide os erros tbem e não quebre o teste
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

declare global {
  namespace Cypress {
    interface Chainable {
      createNewUser(user: CreateUserModel): Chainable<void>
      login(username: string, password: string): Chainable<void>
      createNewRecord(title: string, username: string, password: string): Chainable<void>
    }
  }
}
