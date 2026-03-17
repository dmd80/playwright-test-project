import { type Locator, type Page } from "@playwright/test";

/**
 * Represents the product details page of the saucedemo website.
 * Provides methods to interact with the product page elements, such as adding a product to the cart.
 */

export class ProductPage {
    readonly addToCartButton: Locator;
    readonly productItemName: Locator;

    constructor(page: Page) {
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productItemName = page.locator('[data-test="inventory-item-name"]');
    }

    // Add product to cart
    async addToCart() {
        await this.addToCartButton.click();
    }
}