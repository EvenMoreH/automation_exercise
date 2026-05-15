import { expect } from "@playwright/test";

export class ProductDetailsPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for automation practice");
        this.productInformationCard = page.locator(".product-information");
        this.productName = this.productInformationCard.locator("h2");
        this.productCategory =
            this.productInformationCard.getByText(/^Category:\s*\S.+$/);
        this.productPrice =
            this.productInformationCard.getByText(/^Rs.\s*\S.+$/);
        this.productAvailability = this.productInformationCard.getByText(
            /^Availability:\s*\S.+$/,
        );
        this.productCondition =
            this.productInformationCard.getByText(/^Condition:\s*\S.+$/);
        this.productBrand =
            this.productInformationCard.getByText(/^Brand:\s*\S.+$/);
        this.productImage = page.locator(".view-product").getByRole("img");
    }

    /**
     *
     * @param {Number} productId id of the product to verify correct page is loaded
     */
    async expectLoaded(productId) {
        await expect(this.page).toHaveURL("/product_details/" + productId);
        await expect(this.logo).toBeVisible();
    }

    async isProductImageRendered() {
        return await this.productImage.evaluate((img) => {
            return img.complete && img.naturalWidth > 0;
        });
    }
}
