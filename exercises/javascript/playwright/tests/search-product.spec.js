import { test, expect } from "../fixtures";

const searchPhrases = ["Green Top", "Cotton", "Jeans", "Blue"];
test.use({
    viewport: { width: 1920, height: 1920 },
});

searchPhrases.forEach((searchPhrase) => {
    test(`search for a product: '${searchPhrase}' and verify search results`, async ({
        page,
        mainPage,
        productsPage,
    }) => {
        await test.step("open main page", async () => {
            await mainPage.open();
            await mainPage.expectLoaded();
        });

        await test.step("navigate to products page and verify it is loaded", async () => {
            await mainPage.clickProductsLink();
            await productsPage.expectLoaded();

            await expect(productsPage.productsList).toBeVisible();
            await expect(productsPage.productsListTitle).toBeVisible();
            const productCards = await productsPage.productCard.count();
            expect(productCards).toBeGreaterThan(0);
        });

        await test.step(`search for '${searchPhrase}' and verify search results`, async () => {
            await productsPage.searchForProduct(searchPhrase);

            await expect(page).toHaveURL(`products?search=${searchPhrase}`);
            await expect(productsPage.searchedProductsTitle).toBeVisible();
            const searchedProductCards = await productsPage.productCard.count();
            expect(searchedProductCards).toBeGreaterThan(0);

            const productsNames = await productsPage.getProductNames();
            for (const productName of productsNames) {
                expect(productName.toLowerCase()).toContain(
                    searchPhrase.toLowerCase(),
                );
            }
        });
    });
});
