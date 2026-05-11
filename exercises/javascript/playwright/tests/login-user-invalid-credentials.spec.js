import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";

const invalidCredentials = [
    {
        case: "invalid credentials",
        email: `invalid_${Date.now()}@example.com`,
        password: "invalidPassword",
    },
    {
        case: "invalid credentials - leading/trailing spaces - email",
        email: `   invalid_${Date.now()}@example.com   `,
        password: "invalidPassword",
    },
    {
        case: "invalid credentials - leading/trailing spaces - password",
        email: `invalid_${Date.now()}@example.com`,
        password: "    invalidPassword    ",
    },
];

invalidCredentials.forEach(({ case: caseName, email, password }) => {
    test(`user login with ${caseName}`, async ({ page }) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await test.step("open main page", async () => {
            await mainPage.open();
            await mainPage.acceptCookiesModal();
            await mainPage.expectLoaded();
        });

        await test.step("navigate to login page", async () => {
            await mainPage.clickLoginLink();
            await loginPage.expectLoaded();

            await expect(loginPage.loginForm).toBeVisible();
            await expect(loginPage.loginFormTitle).toBeVisible();
        });

        await test.step("login with invalid credentials", async () => {
            await loginPage.fillLoginForm(email, password);
            await loginPage.submitLoginForm();
        });

        await test.step("verify invalid credentials error message is displayed", async () => {
            await expect(page).toHaveURL(/\/login$/);
            await expect(loginPage.badCredentialsError).toBeVisible();
            await expect(mainPage.loggedInUserLink).not.toBeVisible();
            await expect(mainPage.deleteAccountLink).not.toBeVisible();
        });
    });
});
