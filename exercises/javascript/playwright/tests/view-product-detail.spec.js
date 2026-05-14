import { test, expect } from "../fixtures";

test("view product details", async ({ mainPage, productsPage }) => {
    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("navigate to products page and verify it is loaded", async () => {
        await mainPage.clickProductsLink();
        await productsPage.expectLoaded();

        await expect(productsPage.productsList).toBeVisible();
        const productCards = await productsPage.productCard.count();
        expect(productCards).toBeGreaterThan(0);
    });
});
