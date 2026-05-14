import { test as base, expect } from "@playwright/test";
import { userFixture } from "../fixtures/user.fixture";
import { pagesFixture } from "../fixtures/pages.fixture";
import { adsFixture } from "../fixtures/ads.fixture";

/**
 * @type {import("@playwright/test").TestType<{
 * mainPage: import("../pages/mainPage").MainPage,
 * loginPage: import("../pages/loginPage").LoginPage,
 * signupPage: import("../pages/signupPage").SignupPage,
 * accountCreatedPage: import("../pages/accountCreatedPage").AccountCreatedPage,
 * deleteAccountPage: import("../pages/deleteAccountPage").DeleteAccountPage,
 * contactUsPage: import("../pages/contactUsPage").ContactUsPage,
 * testUser: { email: string, password: string, name: string }
 * }, {}>}
 */
const test = base.extend({
    ...adsFixture,
    ...userFixture,
    ...pagesFixture,
});

export { test, expect };
