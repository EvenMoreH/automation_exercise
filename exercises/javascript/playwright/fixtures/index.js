import { test as base, expect } from "@playwright/test";
import { userFixture } from "../fixtures/user.fixture";
import { pagesFixture } from "../fixtures/pages.fixture";

const test = base.extend({
    ...userFixture,
    ...pagesFixture,
});

export { test, expect };
