import { HOME } from "../../locators/home/homeLocator";
import { ChanceService } from "../../utils/chance";

describe("Create new Password Tests", () => {
  const chanceService: ChanceService = new ChanceService();
  const username: string = chanceService.generateName();
  const password: string = chanceService.generatePassword();

  before(() => {
    cy.createNewUser({
      name: chanceService.generateName(),
      email: chanceService.generateEmail(),
      username,
      password
    })
  })

  beforeEach(() => {
    cy.login(username, password);
  })

  it("Create new password successfully", () => {
    cy.contains(HOME.BUTTON_CREATE_RECORD)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.RECORD_INPUTS)
      .eq(0)
      .should("be.visible")
      .type(chanceService.generateName());

    cy.get(HOME.RECORD_INPUTS)
      .eq(1)
      .should("be.visible")
      .type(chanceService.generateName());

    cy.get(HOME.RECORD_INPUTS)
      .eq(2)
      .type(chanceService.generatePassword());

    cy.contains(HOME.RECORD_BUTTON_REGISTER)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.MESSAGE_MODEL)
      .should("be.visible")
      .and("contain.text", "Registro criado com sucesso.");
  })

  it("Send empty input value", () => {
    cy.contains(HOME.BUTTON_CREATE_RECORD)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.RECORD_INPUTS)
      .eq(1)
      .type(chanceService.generateName());

    cy.get(HOME.RECORD_INPUTS)
      .eq(2)
      .type(chanceService.generatePassword());

    cy.contains(HOME.RECORD_BUTTON_REGISTER)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.MESSAGE_MODEL)
      .should("be.visible")
      .and("contain.text", "Todos os campos devem ser preenchidos.");
  })

  it("Find password By Title", () => {
    const title: string = chanceService.generateName()

    cy.createNewRecord(chanceService.generateName(), chanceService.generateName(), chanceService.generatePassword());

    cy.get(HOME.BUTTON_CLOSE_MODAL)
      .should("be.visible")
      .click({ force: true });

    cy.createNewRecord(title, chanceService.generateName(), chanceService.generatePassword());

    cy.get(HOME.BUTTON_CLOSE_MODAL)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.INPUT_SEARCH_TITLE)
      .should("be.visible")
      .type(title);

    cy.get(`[title="${title}"]`)
      .eq(0)
      .should("be.visible");
  })

  it("Show password", () => {
    let title: string = chanceService.generateName();
    let username: string = chanceService.generateName();
    let password: string = chanceService.generatePassword();

    cy.createNewRecord(title, username, password);

    cy.get(HOME.BUTTON_CLOSE_MODAL)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.INPUT_SEARCH_TITLE)
      .should("be.visible")
      .type(title);

    cy.get(HOME.RECORD)
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    cy.get('h4')
      .should("be.visible")
      .and("contain.text", "DETALHES DO REGISTRO");

    cy.get(HOME.RECORD_INPUTS)
      .eq(0)
      .should("be.visible")
      .and("contain.value", title);

    cy.get(HOME.RECORD_INPUTS)
      .eq(1)
      .should("be.visible")
      .and("contain.value", username);

    cy.get(HOME.RECORD_INPUTS)
      .eq(2)
      .should("be.visible")
      .and("contain.value", password);
  })

  it("Delete password", () => {
    let title: string = chanceService.generateName();
    let username: string = chanceService.generateName();
    let password: string = chanceService.generatePassword();

    cy.createNewRecord(title, username, password);

    cy.get(HOME.BUTTON_CLOSE_MODAL)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.INPUT_SEARCH_TITLE)
      .should("be.visible")
      .type(title);

    cy.get(HOME.RECORD)
      .eq(0)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.BUTTON_DELETE)
      .should("be.visible")
      .click({ force: true });

    cy.get(HOME.INPUT_SEARCH_TITLE)
      .should("be.visible")
      .clear()
      .type(title);

    cy.get(HOME.RECORD)
      .eq(0)
      .should("not.contain.text", title);
  })
})
