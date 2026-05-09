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
    }

    async open() {
        await this.page.goto("https://automationexercise.com");
    }

    async acceptCookiesModal() {
        if (await this.cookiesBannerButton.isVisible()) {
            await this.cookiesBannerButton.click();
        }
    }

    async expectLoaded() {
        expect(this.page.url()).toBe("https://automationexercise.com/");
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
}
