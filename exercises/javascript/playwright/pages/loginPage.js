import { expect } from "@playwright/test";

export class LoginPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.signUpForm = page.locator(".signup-form");
        this.signUpFormTitle = this.page.getByRole("heading", {
            name: "New User Signup",
        });
        this.nameInput = this.signUpForm.getByPlaceholder("Name");
        this.emailInput = this.signUpForm.getByPlaceholder("Email Address");
        this.signupButton = this.page.getByRole("button", { name: "Signup" });
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/login$/);
    }

    async fillSignupForm(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async submitSignupForm() {
        await this.signupButton.click();
    }
}
