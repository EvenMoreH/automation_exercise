import { expect } from "@playwright/test";

export class LoginPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for automation practice");
        this.signUpForm = page.locator(".signup-form");
        this.signUpFormTitle = this.page.getByRole("heading", {
            name: "New User Signup",
        });
        this.signupNameInput = this.signUpForm.getByPlaceholder("Name");
        this.signupEmailInput =
            this.signUpForm.getByPlaceholder("Email Address");
        this.signupButton = this.page.getByRole("button", { name: "Signup" });
        this.userExistsError = this.signUpForm.getByText(
            "Email Address already exist!",
        );

        this.loginForm = page.locator(".login-form");
        this.loginFormTitle = this.page.getByRole("heading", {
            name: "Login to your account",
        });
        this.loginEmailInput = this.loginForm.getByPlaceholder("Email Address");
        this.loginPasswordInput = this.loginForm.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", { name: "Login" });
        this.badCredentialsError = this.loginForm.getByText(
            "Your email or password is incorrect!",
        );
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/login");
        await expect(this.logo).toBeVisible();
    }

    async fillSignupForm(name, email) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async submitSignupForm() {
        await this.signupButton.click();
    }

    async fillLoginForm(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
    }

    async submitLoginForm() {
        await this.loginButton.click();
    }
}
