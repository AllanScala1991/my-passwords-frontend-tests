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

// setado para que o cypress valide os erros tbem e não quebre o teste
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

declare global {
    namespace Cypress {
        interface Chainable {
            createNewUser(user: CreateUserModel): Chainable<void>
            login(username: string, password: string): Chainable<void>
        }
    }
}