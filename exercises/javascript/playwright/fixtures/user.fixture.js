import { expect } from "@playwright/test";

async function sendDeleteUserRequest(request, email, password) {
    const deleteResponse = await request.delete(
        "https://automationexercise.com/api/deleteAccount",
        {
            multipart: {
                email,
                password,
            },
        },
    );

    expect(deleteResponse.status()).toBe(200);

    return deleteResponse.json();
}

async function cleanupUserByApi(request, email, password) {
    const deleteResponseBody = await sendDeleteUserRequest(
        request,
        email,
        password,
    );

    const isDeleted =
        deleteResponseBody.responseCode === 200 &&
        deleteResponseBody.message === "Account deleted!";
    const isAlreadyMissing = deleteResponseBody.responseCode === 404;

    expect(isDeleted || isAlreadyMissing).toBeTruthy();
}

export const userFixture = {
    testUser: async ({ page }, use) => {
        const timestamp = Date.now();

        const testUser = {
            name: `John Doe ${timestamp}`,
            email: `testuser_${timestamp}@example.com`,
            title: "Mr",
            password: "password123",
            birth_date: "15",
            birth_month: "January",
            birth_year: "1990",
            firstname: "John",
            lastname: "Doe",
            company: "Example Inc.",
            address1: "123 Main St",
            address2: "Apt 4B",
            country: "United States",
            state: "California",
            city: "Los Angeles",
            zipcode: "90001",
            mobile_number: "1234567890",
        };

        const response = await page.request.post(
            "https://automationexercise.com/api/createAccount",
            {
                multipart: testUser,
            },
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe("User created!");

        await use({
            email: testUser.email,
            password: testUser.password,
            name: testUser.name,
        });

        await cleanupUserByApi(page.request, testUser.email, testUser.password);
    },
};
