const blockedDomains = [
    "**/*google-analytics.com/**",
    "**/*googletagmanager.com/**",
    "**/*facebook.net/**",
    "**/*adsystem.com/**",
    "**/*adservice.google.com/**",
    "**/*doubleclick.net/**",
    "**/*googlesyndication.com/**",
];

export const adsFixture = {
    context: async ({ context }, use) => {
        for (const domain of blockedDomains) {
            await context.route(domain, async (route) => {
                await route.abort();
            });
        }

        await use(context);
    },
};
