import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page.js';
import { ListPage } from '../pages/list_page.js';
import { CartPage } from '../pages/cart_page.js';
import { CheckoutPage } from '../pages/checkout_page.js';
import { ProductPage } from '../pages/product_page.js';

// Test the checkout process with a single product added to the cart, and verify that the cart amount indicator shows the correct number of items before proceeding to checkout.
test('checkout process', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login();

    // Add a product to the cart by index
    await listPage.addProductToCartByIndex(3);

    // Verify the cart amount indicator shows 1 item, go to the cart and proceed to checkout
    await cartPage.checkCartAmount();
    await cartPage.goToCart();
    await cartPage.goToCheckout();

    // Fill in the checkout information and finish the checkout process
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();

    // Verify that the confirmation message is visible after checkout
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});

// Additional test to cover checkout with multiple products, and to ensure the cart amount indicator is working correctly with multiple items.
test('checkout with a specific product', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productPage = new ProductPage(page);
    const productName = "Sauce Labs Fleece Jacket"

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login();

    // Select a specific product by name
    await listPage.selectProductByName(productName);
    
    // Verify the product page shows the correct product, and add it to the cart
    await expect(productPage.productItemName).toHaveText(productName);
    await productPage.addToCart();

    // Verify the cart amount indicator shows 1 item, go to the cart and proceed to checkout
    await cartPage.checkCartAmount();
    await cartPage.goToCart();
    await cartPage.goToCheckout();

    // Fill in the checkout information and finish the checkout process
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();

    // Verify that the confirmation message is visible after checkout
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});

// Test the checkout process with multiple products added to the cart, and verify that the cart amount indicator shows the correct number of items before proceeding to checkout.
test('checkout with multiple products', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login();

    // Add multiple products to the cart by index
    const randomIndices = Math.random() < 0.5 ? [0,2,4] : [1,3,5];
    await listPage.addProductToCartByIndex(randomIndices);

    // Verify the cart amount indicator shows the correct number of items, go to the cart and proceed to checkout
    await cartPage.checkCartAmount(randomIndices.length);
    await cartPage.goToCart();
    await cartPage.goToCheckout();

    // Fill in the checkout information and finish the checkout process
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();

    // Verify that the confirmation message is visible after checkout
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});