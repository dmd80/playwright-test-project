import { type Locator, type Page } from "@playwright/test";

export class ProductPage {
    readonly addToCartButton: Locator;
    readonly productItemName: Locator;

    constructor(page: Page) {
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productItemName = page.locator('[data-test="inventory-item-name"]');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}