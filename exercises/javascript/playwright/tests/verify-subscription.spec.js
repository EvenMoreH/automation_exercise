import { test, expect } from "../fixtures";

test("verify subscription form", async ({ mainPage }) => {
    const testEmail = `test${Date.now()}@example.com`;

    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("scroll to footer and verify subscription form is visible", async () => {
        await mainPage.scrollToFooter();
        await expect(mainPage.subscribeHeading).toBeVisible();
        await expect(mainPage.subscriptionEmailInput).toBeVisible();
        await expect(mainPage.subscribeButton).toBeVisible();
    });

    await test.step("subscribe to newsletter and verify success message is visible", async () => {
        await mainPage.subscribeToNewsletter(testEmail);
        await expect(mainPage.subscribedSuccessMessage).toBeVisible();
        await expect(mainPage.subscribedSuccessMessage).toHaveText(
            "You have been successfully subscribed!",
        );
    });
});
