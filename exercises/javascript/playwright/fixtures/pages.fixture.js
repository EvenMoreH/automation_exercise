import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeleteAccountPage } from "../pages/deleteAccountPage";
import { ContactUsPage } from "../pages/contactUsPage";

export const pagesFixture = {
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    accountCreatedPage: async ({ page }, use) => {
        await use(new AccountCreatedPage(page));
    },
    deleteAccountPage: async ({ page }, use) => {
        await use(new DeleteAccountPage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },
};
