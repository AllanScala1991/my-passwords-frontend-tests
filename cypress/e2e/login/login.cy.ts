import { CREATE_USER } from "../../locators/createUser/createUserLocator";
import { HOME } from "../../locators/home/homeLocator";
import { LOGIN } from "../../locators/login/loginLocator";
import { ChanceService } from "../../utils/chance";

describe("Login Tests", () => {
    const chanceService: ChanceService = new ChanceService();
    const username: string = chanceService.generateName();
    const password: string = chanceService.generatePassword();

    beforeEach(() => {
        cy.visit("/");
    })

    before(() => {
        cy.createNewUser({
            name: chanceService.generateName(),
            email: chanceService.generateEmail(),
            username,
            password
        });
    })
    
    it("Login successfully", () => {
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
    });
    
    it("Send invalid username", () => {
        cy.get(LOGIN.INPUT_USERNAME)
        .should("be.visible")
        .type("invalid");

        cy.get(LOGIN.INPUT_PASSWORD)
        .should("be.visible")
        .type(password);

        cy.get(LOGIN.BTN_ACCESS)
        .should("be.visible")
        .click({ force: true });

        cy.get(LOGIN.MESSAGE_MODEL)
        .should("be.visible")
        .and("contain.text", "Usuário ou Senha incorretos.");
    })
    
    it("Send empty password", () => {
        cy.get(LOGIN.INPUT_USERNAME)
        .should("be.visible")
        .type(username);

        cy.get(LOGIN.BTN_ACCESS)
        .should("be.visible")
        .click({ force: true });

        cy.get(LOGIN.MESSAGE_MODEL)
        .should("be.visible")
        .and("contain.text", "Os campos de Usuário e Senha são obrigatórios.");
    })
    
    it("Should validate redirection button create new user", () => {
        cy.get(LOGIN.LINK_CREATE_USER)
        .should("be.visible")
        .click({ force: true });

        cy.get(CREATE_USER.INPUT_NAME)
        .should("be.visible");
    })
})