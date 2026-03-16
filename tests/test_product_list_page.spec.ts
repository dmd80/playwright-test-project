import test from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { ListPage } from '../pages/list_page';

/**
 * Test the functionality of all add to cart and remove buttons on the product list page, by adding all products to the cart and then removing them, 
 * with built in validation for the buttons appearing and disappearing as expected.
 */
test('check functionality of all add to cart and remove buttons on product list page', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const products = [1,2,3,4,5,6]

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login();

    // Add all six products to the cart. Built in validation for the Remove button appearing.
    await listPage.addProductToCartByIndex(products);

    // Remove all six products from cart. Built in validation for the Add to cart button appearing.
    await listPage.removeProductFromCartByIndex(products)
});

/**
 * Negative test to check the failure of all add to cart and remove buttons on the product list page, by adding all products to the cart and then removing them,
 * with built in validation for the buttons appearing and disappearing as expected. 
 * 
 * This test is designed to fail by using a separate set of login credentials that will display a malfunctioning website, to ensure that the validation is working correctly.
 */
test('negative test functionality of add to cart and remove buttons on product list page', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const products = [1,2,3,4,5,6]

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login('performance_glitch_user');

    // Add all six products to the cart. Built in validation for the Remove button appearing.
    await listPage.addProductToCartByIndex(products);

    // Remove all six products from cart. Built in validation for the Add to cart button appearing.
    await listPage.removeProductFromCartByIndex(products)
});