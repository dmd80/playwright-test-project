import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Represents the Cart Page of the website.
 * Provides methods to interact with it, such as checking the cart amount indicator, navigating to the cart page, and proceeding to checkout.
 */
export class CartPage {
    readonly checkoutButton: Locator;
    readonly cartAmountIndicator: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.cartAmountIndicator = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
    }

    // Navigate to the cart page
    async goToCart() {
        await this.cartButton.click();
    }
    
    // Check the cart amount indicator, with error handling for when the badge does not appear
    async checkCartAmount(expectedAmount: number = 1) {
        await expect.soft(this.cartAmountIndicator, "Cart amount indicator does match expected value.").toHaveText(expectedAmount.toString(),);
    }

    // Navigate to the checkout page
    async goToCheckout() {
        await this.checkoutButton.click();
    }
}