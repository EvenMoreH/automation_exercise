import { expect } from "@playwright/test";

export class ProductsPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for automation practice");
        this.productsList = page.locator(".features_items");
        this.productsListTitle = this.productsList.getByRole("heading", {
            name: "All Products",
        });
        this.productCard = this.productsList.locator(".product-image-wrapper");
        this.productLink = this.productCard.getByRole("link");
        this.searchInput = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
        this.searchedProductsTitle = this.productsList.getByRole("heading", {
            name: "Searched Products",
        });
        this.productName = this.productCard
            .locator(".productinfo")
            .getByRole("paragraph");
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/products");
        await expect(this.logo).toBeVisible();
    }

    async openNthProduct(productId) {
        await this.productLink.nth(productId - 1).click();
    }

    async searchForProduct(searchPhrase) {
        await this.searchInput.fill(searchPhrase);
        await this.searchButton.click();
    }

    async getProductNames() {
        const productCount = await this.productName.count();
        const productNames = [];
        for (let i = 0; i < productCount; i++) {
            productNames.push(await this.productName.nth(i).innerText());
        }
        return productNames;
    }
}
