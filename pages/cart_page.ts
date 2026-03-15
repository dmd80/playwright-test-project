import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
    readonly checkoutButton: Locator;
    readonly cartAmountIndicator: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.cartAmountIndicator = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
    }

    async goToCart() {
        await this.cartButton.click();
    }
    
    async checkCartAmount(expectedAmount: number = 1) { // Badge locator does not appear until a product is added to the cart. Add error handling to handle this case gracefully.
        await expect(this.cartAmountIndicator).toHaveText(expectedAmount.toString());
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}