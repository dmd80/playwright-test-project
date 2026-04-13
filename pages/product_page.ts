import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Represents the product details page of the saucedemo website.
 * Provides methods to interact with the product page elements, such as adding a product to the cart.
 */

export class ProductPage {
    readonly addToCartButton: Locator;
    readonly productItemName: Locator;
    readonly backToProductsButton: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productItemName = page.locator('[data-test="inventory-item-name"]');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
    }

    // Add the product to the cart by clicking the add to cart button
    async addToCart() {
        await this.addToCartButton.click();
    }

    // Navigate back to the product list page by clicking the back to products button
    async goBackToProducts() {
        await this.backToProductsButton.click();
    }

    // Verify that the product details are displayed correctly, including the product name, description, price, and add to cart button
    async verifyProductDetails() {
        await expect(this.productItemName).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
    }
}