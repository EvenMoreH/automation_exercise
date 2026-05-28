import { expect } from "@playwright/test";

export class CartPage {
    /**
     *
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.footer = page.locator("#footer");
        this.subscribeHeading = this.footer.getByRole("heading", {
            name: "Subscription",
        });
        this.subscriptionEmailInput =
            this.footer.getByPlaceholder("Your email address");
        this.subscribeButton = this.footer.locator("#subscribe");
        this.subscribedSuccessMessage = this.footer.locator(".alert-success");
        this.logo = page.getByAltText("Website for automation practice");
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/view_cart");
        await expect(this.logo).toBeVisible();
    }

    async scrollToFooter() {
        await this.footer.scrollIntoViewIfNeeded();
    }

    async subscribeToNewsletter(email) {
        await this.scrollToFooter();
        await this.subscriptionEmailInput.fill(email);
        await this.subscribeButton.click();
    }
}
