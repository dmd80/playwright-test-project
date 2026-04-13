import test from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { ListPage } from '../pages/list_page';
import { ProductPage } from '../pages/product_page';

const PRODUCTS = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)'
] as const;

/** 
 * Prompted Opencode AI to make this test case, which validates that all product links on the product list page navigate to the correct product detail page, 
 * by clicking on each product and verifying that the product details are displayed correctly, with built-in validation for the product name, description, price, 
 * and add to cart button appearing as expected.
 * 
 * This test ensures that all product links are functioning correctly and that the product details are displayed as expected, 
 * providing comprehensive coverage of the product link functionality on the saucedemo website.
 */ 
test.describe('Product Link Validation', () => {
    test('validate all product links navigate to correct detail page', async ({ page }) => {
        const homePage = new HomePage(page);
        const listPage = new ListPage(page);
        const productPage = new ProductPage(page);

        await homePage.goto();
        await homePage.login();

        for (const productName of PRODUCTS) {
            await listPage.selectProductByName(productName);
            await productPage.verifyProductDetails();
            await productPage.goBackToProducts();
        }
    });
});
