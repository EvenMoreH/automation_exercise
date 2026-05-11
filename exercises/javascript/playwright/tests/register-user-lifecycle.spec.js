import { test, expect } from "../fixtures";
import { buildUser } from "../factories/user.factory";

test("register user", async ({
    mainPage,
    loginPage,
    signupPage,
    accountCreatedPage,
    deleteAccountPage,
}) => {
    const testUser = buildUser();

    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("start registration process", async () => {
        await mainPage.clickLoginLink();
        await loginPage.expectLoaded();

        await expect(loginPage.signUpForm).toBeVisible();
        await expect(loginPage.signUpFormTitle).toBeVisible();
    });

    await test.step("fill registration form and submit", async () => {
        await loginPage.fillSignupForm(testUser.name, testUser.email);
        await loginPage.submitSignupForm();
    });

    await test.step("enter account information", async () => {
        await signupPage.expectLoaded();
        await expect(signupPage.pageFormTitle).toBeVisible();

        await signupPage.selectTitle(testUser.title);
        await signupPage.fillPassword(testUser.password);
        await signupPage.selectDateOfBirth(
            testUser.dayOfBirth,
            testUser.monthOfBirth,
            testUser.yearOfBirth,
        );
        await signupPage.setNewsletterSubscription();
        await signupPage.setSpecialOffersSubscription();
    });

    await test.step("enter address information", async () => {
        await signupPage.fillAddressInformation({
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            company: testUser.company,
            address1: testUser.address1,
            address2: testUser.address2,
            country: testUser.country,
            state: testUser.state,
            city: testUser.city,
            zipcode: testUser.zipcode,
            mobileNumber: testUser.mobileNumber,
        });
    });

    await test.step("submit registration form", async () => {
        await signupPage.submitCreateAccountForm();
        await accountCreatedPage.expectLoaded();

        await expect(accountCreatedPage.successHeader).toBeVisible();

        await accountCreatedPage.clickContinue();
    });

    await test.step("verify correct user is logged in", async () => {
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
