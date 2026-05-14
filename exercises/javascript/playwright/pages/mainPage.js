import { expect } from "@playwright/test";

export class MainPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for automation practice");
        this.loginLink = page.getByRole("link", { name: "Signup / Login" });
        this.cookiesBannerButton = page.getByRole("button", {
            name: /consent|accept|agree|ok/i,
        });
        this.loggedInUserLink = page.getByText(/Logged in as (.+)/i);
        this.deleteAccountLink = page.getByRole("link", {
            name: "Delete Account",
        });
        this.logoutLink = page.getByRole("link", { name: "Logout" });
        this.contactUsLink = page.getByRole("link", { name: "Contact us" });
        this.testCasesLink = page
            .locator(".navbar-nav")
            .getByRole("link", { name: "Test Cases" });
    }

    async acceptCookiesModal() {
        if (await this.cookiesBannerButton.isVisible()) {
            await this.cookiesBannerButton.click();
        }
    }

    async open() {
        await this.page.goto("https://automationexercise.com");
        await this.acceptCookiesModal();
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("https://automationexercise.com/");
        await expect(this.logo).toBeVisible();
    }

    async clickLoginLink() {
        await this.loginLink.click();
    }

    async returnLoggedInUsername() {
        const loggedInUserLink = this.loggedInUserLink;
        const username = await loggedInUserLink.innerText();
        return username.replace("Logged in as ", "").trim();
    }

    async clickDeleteAccountLink() {
        await this.deleteAccountLink.click();
    }

    async clickLogoutLink() {
        await this.logoutLink.click();
    }

    async clickContactUsLink() {
        await this.contactUsLink.click();
    }

    async clickTestCasesLink() {
        await this.testCasesLink.click();
    }
}
