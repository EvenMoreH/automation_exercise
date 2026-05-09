import { expect } from "@playwright/test";

export class DeleteAccountPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.successHeader = page.getByRole("heading", {
            name: "ACCOUNT DELETED!",
        });
        this.continueButton = this.page.locator("[data-qa='continue-button']");
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/delete_account$/);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
