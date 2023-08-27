/// <reference types="cypress" />

import { CREATE_USER } from "../locators/createUser/createUserLocator";
import { CreateUserModel } from "../models/createUser.model";
import { ChanceService } from "../utils/chance";

Cypress.Commands.add("createNewUser", (chanceService: ChanceService, user: CreateUserModel) => {
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

declare global {
    namespace Cypress {
        interface Chainable {
            createNewUser(chanceService: ChanceService, user: CreateUserModel): Chainable<void>
        }
    }
}