import { HOME } from "../../locators/home/homeLocator";
import { ChanceService } from "../../utils/chance";

describe("Random Password Tests", () => {
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

    it("Generate new random password", () => {
        cy.get(HOME.BUTTON_GENERATE_RANDOM_PASSWORD)
        .contains('GERAR')
        .should('be.visible')
        .click({ force: true });

        cy.get(HOME.INPUT_RANDOM_PASSWORD)
        .should('be.visible')
        .then(res => {
            const randomValue = res.val();

            expect(randomValue).not.empty;
        })
    })
})