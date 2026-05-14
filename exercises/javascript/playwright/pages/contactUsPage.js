import { expect } from "@playwright/test";

export class ContactUsPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for automation practice");
        this.contactForm = page.locator("#contact-us-form");
        this.contactFormTitle = page.getByRole("heading", {
            name: "GET IN TOUCH",
        });
        this.nameInput = page.locator("[data-qa='name']");
        this.emailInput = page.locator("[data-qa='email']");
        this.subjectInput = page.locator("[data-qa='subject']");
        this.messageInput = page.locator("[data-qa='message']");
        this.attachmentInput = page.locator("input[name='upload_file']");
        this.submitButton = page.locator("[data-qa='submit-button']");
        this.successMessage = page.locator(".status.alert.alert-success");
        this.homeButton = page
            .locator("#form-section")
            .getByRole("link", { name: "Home" });
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/contact_us");
        await expect(this.logo).toBeVisible();
    }

    async waitForAttachmentProcessing() {
        await this.page.waitForLoadState("load");
    }

    async fillContactForm(name, email, subject, message, filePath) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);

        await this.attachmentInput.setInputFiles(filePath);
        await this.waitForAttachmentProcessing();
    }

    async submitForm() {
        this.page.once("dialog", async (dialog) => {
            await dialog.accept();
        });
        await this.submitButton.click();
    }

    async navigateBackToHomePage() {
        await this.homeButton.click();
    }
}
