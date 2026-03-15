import { type Locator, type Page } from "@playwright/test";

/**
 * Represents the product list page of the saucedemo website.
 * Provides methods to interact with the list page elements.
 */
export class ListPage {
    readonly productItem: Locator;

    constructor(page: Page) {
        this.productItem = page.locator('.inventory_item');
    }

    async addProductToCartByIndex(index: number = 0) {
        await this.productItem.nth(index).getByRole('button', { name: 'Add to cart' }).click(); // What happens if the index is out of bounds? Add error handling to handle this case gracefully.
    }

    async addProductToCartByName(name: string = "Sauce Labs Backpack") {
        await this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }).click();
    }

    async selectProductByIndex(index: number = 0) {
        await this.productItem.nth(index).getByRole('link').first().click(); // What happens if the index is out of bounds? Add error handling to handle this case gracefully.
    }

    async selectProductByName(name: string = "Sauce Labs Backpack") {
        await this.productItem.filter({ hasText: name }).getByRole('link', { name }).first().click();
    }
}
