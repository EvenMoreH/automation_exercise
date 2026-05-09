import { expect } from "@playwright/test";

export class AccountCreatedPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.successHeader = page.getByRole("heading", {
            name: "ACCOUNT CREATED!",
        });
        this.continueButton = this.page.getByRole("link", {
            name: "Continue",
        });
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/account_created$/);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
