import { test, expect } from "../fixtures";
import { fetchProductsData } from "../utils/fetchProductsData";

// 1-base index products; test page can handle up to 4 requests at a time
const productNumbersToTest = [1, 12, 33];

for (const productNumber of productNumbersToTest) {
    test(`view product details for product: ${productNumber}`, async ({
        request,
        mainPage,
        productsPage,
        productDetailsPage,
    }) => {
        const products = await fetchProductsData(request);
        const expectedProduct = products[productNumber - 1];

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

        await test.step(`click #${productNumber} product and verify product details page is loaded`, async () => {
            await productsPage.openNthProduct(productNumber);
            await productDetailsPage.expectLoaded(expectedProduct.id);
        });

        await test.step("verify product details are visible", async () => {
            await expect(
                productDetailsPage.productInformationCard,
            ).toBeVisible();
            await expect(productDetailsPage.productName).toBeVisible();
            await expect(productDetailsPage.productCategory).toBeVisible();
            await expect(productDetailsPage.productPrice).toBeVisible();
            await expect(productDetailsPage.productAvailability).toBeVisible();
            await expect(productDetailsPage.productCondition).toBeVisible();
            await expect(productDetailsPage.productBrand).toBeVisible();
            await expect
                .poll(() => productDetailsPage.isProductImageRendered(), {
                    timeout: 10000,
                })
                .toBe(true);
        });
    });
}
