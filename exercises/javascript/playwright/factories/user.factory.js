export function buildUser(overrides = {}) {
    const timestamp = Date.now();

    return {
        name: `John Doe ${timestamp}`,
        email: `john.doe.${timestamp}@example.com`,
        title: "Mr.",
        password: "password123",
        dayOfBirth: "15",
        monthOfBirth: "January",
        yearOfBirth: "1990",
        firstName: "John",
        lastName: "Doe",
        company: "Example Inc.",
        address1: "123 Main St",
        address2: "Apt 4B",
        country: "United States",
        state: "California",
        city: "Los Angeles",
        zipcode: "90001",
        mobileNumber: "+1234567890",
        ...overrides,
    };
}
