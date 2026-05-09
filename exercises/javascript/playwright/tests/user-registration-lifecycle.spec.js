import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeleteAccountPage } from "../pages/deleteAccountPage";

test("Register user", async ({ page }) => {
    const testUser = {
        name: "John Doe",
        email: `john.doe.${Date.now()}@example.com`,
        title: "Mr.",
        password: "password123",
        dayOfBirth: 15,
        monthOfBirth: "January",
        yearOfBirth: 1990,
        firstName: "John",
        lastName: "Doe",
        company: "Example Inc.",
        address1: "123 Main St",
        address2: "Apt 4B",
        country: "United States",
        state: "California",
        city: "Los Angeles",
        zipcode: "90001",
        mobileNumber: "+1234567890",
    };

    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    await test.step("Open main page", async () => {
        await mainPage.open();
        await mainPage.acceptCookiesModal();
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
