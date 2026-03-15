import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home_page';
import { ListPage } from '../pages/list_page';
import { CartPage } from '../pages/cart_page';
import { CheckoutPage } from '../pages/checkout_page';
import { ProductPage } from '../pages/product_page';


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

test('checkout with multiple products', async ({ page }) => {
    const homePage = new HomePage(page);
    const listPage = new ListPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Go to the home page and log in
    await homePage.goto();
    await homePage.login();

    // Add multiple products to the cart by index
    await listPage.addProductToCartByIndex(3);
    await listPage.addProductToCartByIndex(5);

    // Verify the cart amount indicator shows 2 items, go to the cart and proceed to checkout
    await cartPage.checkCartAmount(2);
    await cartPage.goToCart();
    await cartPage.goToCheckout();

    // Fill in the checkout information and finish the checkout process
    await checkoutPage.fillCheckoutInformation();
    await checkoutPage.finishCheckout();

    // Verify that the confirmation message is visible after checkout
    await expect(checkoutPage.confirmationMessage).toBeVisible();
});