import { CREATE_USER } from "../../locators/createUser/createUserLocator";
import { LOGIN } from "../../locators/login/loginLocator";
import { ChanceService } from "../../utils/chance";

describe("Create User Tests", () => {
    const chanceService: ChanceService = new ChanceService();

    beforeEach(() => {
        cy.visit("/create/user");
    })

    it("Create user successfully", () => {
        cy.get(CREATE_USER.INPUT_NAME)
        .should("be.visible")
        .type(chanceService.generateName());

        cy.get(CREATE_USER.INPUT_EMAIL)
        .should("be.visible")
        .type(chanceService.generateEmail());

        cy.get(CREATE_USER.INPUT_USERNAME)
        .should("be.visible")
        .type(chanceService.generateName());

        cy.get(CREATE_USER.INPUT_PASSWORD)
        .should("be.visible")
        .type(chanceService.generatePassword());

        cy.get(CREATE_USER.BTN_SAVE)
        .should("be.visible")
        .click({ force: true });

        cy.get(CREATE_USER.MODAL_MESSAGE)
        .should("be.visible")
        .and("contain.text", "Parabéns, seu usuário foi criado com sucesso.")
    })
    
    it("Send empty name", () => {
        cy.get(CREATE_USER.INPUT_EMAIL)
        .should("be.visible")
        .type(chanceService.generateEmail());

        cy.get(CREATE_USER.INPUT_USERNAME)
        .should("be.visible")
        .type(chanceService.generateName());

        cy.get(CREATE_USER.INPUT_PASSWORD)
        .should("be.visible")
        .type(chanceService.generatePassword());

        cy.get(CREATE_USER.BTN_SAVE)
        .should("be.visible")
        .click({ force: true });

        cy.get(CREATE_USER.MODAL_MESSAGE)
        .should("be.visible")
        .and("contain.text", "Todos os campos devem ser preenchidos.")
    })
    
    it("Duplicated username", () => {
        cy.createNewUser({
            name: chanceService.generateName(),
            email: chanceService.generateEmail(),
            username: "test",
            password: chanceService.generatePassword()
        });

        cy.visit("/create/user");

        cy.get(CREATE_USER.INPUT_NAME)
        .should("be.visible")
        .type(chanceService.generateName());

        cy.get(CREATE_USER.INPUT_EMAIL)
        .should("be.visible")
        .type(chanceService.generateEmail());

        cy.get(CREATE_USER.INPUT_USERNAME)
        .should("be.visible")
        .type("test");

        cy.get(CREATE_USER.INPUT_PASSWORD)
        .should("be.visible")
        .type(chanceService.generatePassword());

        cy.get(CREATE_USER.BTN_SAVE)
        .should("be.visible")
        .click({ force: true });

        cy.get(CREATE_USER.MODAL_MESSAGE)
        .should("be.visible")
        .and("contain.text", "Já existe um usuário cadastrado com essas informações.")
    })
    
    it("Back button to login page", () => {
        cy.get(CREATE_USER.BTN_BACK)
        .should("be.visible")
        .click({ force: true });

        cy.get(LOGIN.INPUT_USERNAME)
        .should("be.visible");
    })
})