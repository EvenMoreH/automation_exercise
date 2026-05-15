import { test as base, expect, Page } from "@playwright/test";
import { userFixture } from "../fixtures/user.fixture";
import { pagesFixture } from "../fixtures/pages.fixture";
import { adsFixture } from "../fixtures/ads.fixture";

/**
 * @type {import("@playwright/test").TestType<{
 *   mainPage: Page,
 *   loginPage: Page,
 *   signupPage: Page,
 *   accountCreatedPage: Page,
 *   deleteAccountPage: Page,
 *   contactUsPage: Page,
 *   testCasePage: Page,
 *   productsPage: Page,
 *   productDetailsPage: Page,
 *   testUser: { email: string; password: string; name: string }
 * }>}
 */
const test = base.extend({
    ...adsFixture,
    ...userFixture,
    ...pagesFixture,
});

export { test, expect };
