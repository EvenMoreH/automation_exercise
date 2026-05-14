import { expect } from "@playwright/test";

export class TestCasesPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for practice automation");
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/test_cases");
        await expect(this.logo).toBeVisible();
    }
}
