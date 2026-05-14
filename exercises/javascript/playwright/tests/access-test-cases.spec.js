import { expect, test } from "../fixtures";

test("access test cases page", async ({ mainPage, testCasesPage }) => {
    await test.step("open main page", async () => {
        await mainPage.open();
        await mainPage.expectLoaded();
    });

    await test.step("navigate to test cases page and verify it is loaded", async () => {
        await mainPage.clickTestCasesLink();
        await testCasesPage.expectLoaded();
    });
});
