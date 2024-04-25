import { test, expect } from '@playwright/test';
import { EuropePage } from '../pages/europePage';

let europePage: EuropePage;
const cityParameters = ['Krakow','Warsaw','Paris','Madrid','Berlin'];

test.beforeEach('Loading page', async ({ page }) => {
    europePage = new EuropePage(page);
    await europePage.navigateToEuropePage();
});

for (const city of cityParameters) {
    test(`Verify the Search Functionality ${city}`, async ({ page }) => {
        await europePage.enterCityNameInSearchAndClick(city);
        const tourDestinations = await page.$$eval('.ao-clp-algolia-search__definition-value-list', (results) =>
            results.map((result) => result.textContent)
        );
        for (const name of tourDestinations) {
            expect(name).toContain(city);
        }
    })
}




