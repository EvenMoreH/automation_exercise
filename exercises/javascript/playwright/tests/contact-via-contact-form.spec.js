import { test, expect } from "../fixtures";
import * as path from "path";

const attachmentFiles = [
    "testFile.txt",
    "testEmptyFile.txt",
    "testPDF.pdf",
    "testPNGImage.png",
    "testJPGImage.jpg",
];

const formData = {
    name: "Test User",
    email: `testuser${Date.now()}@example.com`,
    subject: "Test Subject",
    message: "This is a test message for contact form submission.",
};

attachmentFiles.forEach((file) => {
    test(`contact via contact form with attachment: ${file}`, async ({
        mainPage,
        contactUsPage,
    }) => {
        await test.step("open main page", async () => {
            await mainPage.open();
            await mainPage.expectLoaded();
        });

        await test.step("navigate to contact us page", async () => {
            await mainPage.clickContactUsLink();
            await contactUsPage.expectLoaded();

            await expect(contactUsPage.contactForm).toBeVisible();
            await expect(contactUsPage.contactFormTitle).toBeVisible();
        });

        await test.step(`fill contact form, attach file: ${file} and submit`, async () => {
            const filePath = path.join(__dirname, "data/attachments", file);

            await contactUsPage.fillContactForm(
                formData.name,
                formData.email,
                formData.subject,
                formData.message,
                filePath,
            );
            await contactUsPage.submitForm();
        });

        await test.step("verify success message is displayed and navigate back to home page", async () => {
            await expect(contactUsPage.successMessage).toBeVisible();

            await contactUsPage.navigateBackToHomePage();
            await mainPage.expectLoaded();
        });
    });
});
