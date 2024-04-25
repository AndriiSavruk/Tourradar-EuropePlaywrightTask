import { Page } from "@playwright/test";

export class EuropePage {
    private page: Page;
    
    constructor(page: Page) {
      this.page = page;
    }
  
    async navigateToEuropePage(): Promise<void> {
      await this.page.setViewportSize({width:1536,height:824});
      await this.page.goto('/d/europe', {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
    }

    async enterCityNameInSearchAndClick(city:string): Promise<void> {
        await this.page.locator('div.search > input').click();
        await this.page.locator('div.search > input').type(city);
        await this.page.waitForSelector('.autocomplete-list');
        await this.page.locator('div.search > input').press('Enter');
        await this.page.waitForSelector('.am-serp-results-stats__title');
    }
}