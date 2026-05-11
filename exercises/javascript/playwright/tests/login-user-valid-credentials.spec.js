import { test, expect } from "../fixtures";

test("user login with valid credentials", async ({
    mainPage,
    loginPage,
    deleteAccountPage,
    testUser,
}) => {
    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("navigate to login page", async () => {
        await mainPage.clickLoginLink();
        await loginPage.expectLoaded();

        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginFormTitle).toBeVisible();
    });

    await test.step("login with valid credentials", async () => {
        await loginPage.fillLoginForm(testUser.email, testUser.password);
        await loginPage.submitLoginForm();
    });

    await test.step("verify user is logged in", async () => {
        await mainPage.expectLoaded();
        await expect(mainPage.loggedInUserLink).toBeVisible();

        const loggedInUsername = await mainPage.returnLoggedInUsername();
        expect(loggedInUsername).toBe(testUser.name);
    });

    await test.step("delete account", async () => {
        await mainPage.clickDeleteAccountLink();
        await deleteAccountPage.expectLoaded();
        await expect(deleteAccountPage.successHeader).toBeVisible();

        await deleteAccountPage.clickContinue();
        await mainPage.expectLoaded();
        expect(mainPage.loggedInUserLink).not.toBeVisible();
    });
});
