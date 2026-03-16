import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Represents the product list page of the saucedemo website.
 * Provides methods to interact with the list page elements.
 */
export class ListPage {
    readonly productItem: Locator;
    readonly productName: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor(page: Page) {
        this.productItem = page.locator('.inventory_item');
        this.productName = page.locator('inventory_item_name');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeFromCartButton = page.getByRole('button', { name: 'Remove' });
    }

    // Add a product to the cart by index, and check if the remove button is visible. Can be given as a single index or an array of indices. Defaults to the first single product.
    async addProductToCartByIndex(index: number | number[] = 0) {
        if (Array.isArray(index)) {
            for (const i of index) {
                await this.productItem.nth(i).getByRole('button', { name: 'Add to cart' }).click();
                expect.soft(this.productItem.nth(i).getByRole('button', { name: 'Remove' }), 'Remove button is visible.').toBeVisible();
            }
        } else {
            await this.productItem.nth(index).getByRole('button', { name: 'Add to cart' }).click();
            expect.soft(this.productItem.nth(index).getByRole('button', { name: 'Remove' }), 'Remove button is visible.').toBeVisible();
        }
    }

    // Add a product to the cart by name, and check if the remove button is visible. Defaults to "Sauce Labs Backpack".
    async addProductToCartByName(name: string = "Sauce Labs Backpack") {
        await this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }).click();
        expect.soft(this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Remove' }), 'Remove button is visible.').toBeVisible();
    }

    // Navigate to a product's details page by index. Defaults to the first single product.
    async selectProductByIndex(index: number = 0) {
        await this.productItem.nth(index).getByRole('link').first().click();
    }

    // Navigate to a product's details page by name. Defaults to "Sauce Labs Backpack".
    async selectProductByName(name: string = "Sauce Labs Backpack") {
        await this.productItem.filter({ hasText: name }).getByRole('link', { name }).first().click();
    }

    // Remove a product from the cart by index, and check if the add to cart button is visible. Can be given as a single index or an array of indices. Defaults to the first single product.
    async removeProductFromCartByIndex(index: number | number[] = 0) {
        if (Array.isArray(index)) {
            for (const i of index) {
                await this.productItem.nth(i).getByRole('button', { name: 'Remove' }).click();
                expect.soft(this.productItem.nth(i).getByRole('button', { name: 'Add to cart' }), 'Add to cart button is visible.').toBeVisible();
            }
        } else {
            await this.productItem.nth(index).getByRole('button', { name: 'Remove' }).click();
            expect.soft(this.productItem.nth(index).getByRole('button', { name: 'Add to cart' }), 'Add to cart button is visible.').toBeVisible();
        }
    }

    // Remove a product from the cart by name, and check if the add to cart button is visible. Defaults to "Sauce Labs Backpack".
    async removeProductFromCartByName(name: string = "Sauce Labs Backpack") {
        await this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Remove' }).click();
        expect.soft(this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }), 'Add to cart button is visible.').toBeVisible();
    }
}
