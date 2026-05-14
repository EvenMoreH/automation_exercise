import { expect } from "@playwright/test";

export class SignupPage {
    /**
     *
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
        this.page = page;
        this.logo = page.getByAltText("Website for practice automation");
        this.pageFormTitle = this.page.getByRole("heading", {
            name: "ENTER ACCOUNT INFORMATION",
        });
        this.passwordInput = this.page.locator("[data-qa='password']");
        this.daysSelect = this.page.locator("[data-qa='days']");
        this.monthsSelect = this.page.locator("[data-qa='months']");
        this.yearsSelect = this.page.locator("[data-qa='years']");
        this.newsletterCheckbox = this.page.locator("#newsletter");
        this.specialOffersCheckbox = this.page.locator("#optin");
        this.firstNameInput = this.page.locator("[data-qa='first_name']");
        this.lastNameInput = this.page.locator("[data-qa='last_name']");
        this.companyInput = this.page.locator("[data-qa='company']");
        this.address1Input = this.page.locator("[data-qa='address']");
        this.address2Input = this.page.locator("[data-qa='address2']");
        this.countrySelect = this.page.locator("[data-qa='country']");
        this.stateInput = this.page.locator("[data-qa='state']");
        this.cityInput = this.page.locator("[data-qa='city']");
        this.zipcodeInput = this.page.locator("[data-qa='zipcode']");
        this.mobileNumberInput = this.page.locator("[data-qa='mobile_number']");
        this.createAccountButton = this.page.getByRole("button", {
            name: "Create Account",
        });
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL("/signup");
        await expect(this.logo).toBeVisible();
    }

    /**
     *
     * @param {string} title - "Mr." or "Mrs."
     */
    async selectTitle(title) {
        const titleLocator = this.page.getByRole("radio", { name: title });
        await titleLocator.check();
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    /**
     *
     * @param {string} day - The day of the month (1-31).
     * @param {string} month - The full name of the month (e.g., "January", "February").
     * @param {string} year - The year (e.g., 1900-2021).
     */
    async selectDateOfBirth(day, month, year) {
        await this.daysSelect.selectOption(day);
        await this.monthsSelect.selectOption(month);
        await this.yearsSelect.selectOption(year);
    }

    async setNewsletterSubscription() {
        await this.newsletterCheckbox.check();
    }

    async setSpecialOffersSubscription() {
        await this.specialOffersCheckbox.check();
    }

    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} company
     * @param {string} address1
     * @param {string} address2
     * @param {string} country - [India, United States, Canada, Australia, Israel, New Zealand, Singapore]
     * @param {string} state
     * @param {string} city
     * @param {string} zipcode
     * @param {string} mobileNumber
     */
    async fillAddressInformation({
        firstName,
        lastName,
        company,
        address1,
        address2,
        country,
        state,
        city,
        zipcode,
        mobileNumber,
    }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.countrySelect.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async submitCreateAccountForm() {
        await this.createAccountButton.click();
    }

    async registerNewUser() {
        await this.selectTitle(title);
        await this.fillPassword(password);
        await this.selectDateOfBirth(day, month, year);
        await this.setNewsletterSubscription();
        await this.setSpecialOffersSubscription();
        await this.fillAddressInformation({
            firstName,
            lastName,
            company,
            address1,
            address2,
            country,
            state,
            city,
            zipcode,
            mobileNumber,
        });
        await this.createAccountButton.click();
    }
}
