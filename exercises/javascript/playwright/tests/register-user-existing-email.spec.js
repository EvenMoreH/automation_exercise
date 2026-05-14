import { test, expect } from "../fixtures";

test("register user with existing email", async ({
    mainPage,
    loginPage,
    testUser,
}) => {
    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("navigate to signup page", async () => {
        await mainPage.clickLoginLink();
        await loginPage.expectLoaded();

        await expect(loginPage.signUpForm).toBeVisible();
        await expect(loginPage.signUpFormTitle).toBeVisible();
    });

    await test.step("fill registration form with existing email and submit", async () => {
        await loginPage.fillSignupForm("ExistingUser", testUser.email);
        await loginPage.submitSignupForm();

        await expect(loginPage.userExistsError).toBeVisible();
    });
});
