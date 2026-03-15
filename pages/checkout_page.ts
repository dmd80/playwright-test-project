import { type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class CheckoutPage {
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly postalcode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.firstname = page.getByPlaceholder('First Name');
        this.lastname = page.getByPlaceholder('Last Name');
        this.postalcode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.confirmationMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    async fillCheckoutInformation(firstname: string = faker.person.firstName(), lastname: string = faker.person.lastName(), postalcode: string = faker.location.zipCode()) {
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.postalcode.fill(postalcode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

}