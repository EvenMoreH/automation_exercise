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
        this.productCard = this.productsList.locator(".product-image-wrapper");
        this.productLink = this.productCard.getByRole("link");
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/products");
        await expect(this.logo).toBeVisible();
    }

    async openNthProduct(productId) {
        await this.productLink.nth(productId - 1).click();
    }
}
