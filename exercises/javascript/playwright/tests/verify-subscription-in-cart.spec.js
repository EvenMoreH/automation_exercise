import { test, expect } from "../fixtures";

test("verify subscription form on cart page and subscribe to newsletter", async ({
    mainPage,
    cartPage,
}) => {
    const testEmail = `test${Date.now()}@example.com`;

    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("navigate to cart page and verify subscription form is visible", async () => {
        await mainPage.clickCartLink();
        await cartPage.expectLoaded();

        await expect(cartPage.subscribeHeading).toBeVisible();
        await expect(cartPage.subscriptionEmailInput).toBeVisible();
        await expect(cartPage.subscribeButton).toBeVisible();
    });

    await test.step("subscribe to newsletter and verify success message is visible", async () => {
        await cartPage.subscribeToNewsletter(testEmail);
        await expect(cartPage.subscribedSuccessMessage).toBeVisible();
        await expect(cartPage.subscribedSuccessMessage).toHaveText(
            "You have been successfully subscribed!",
        );
    });
});
