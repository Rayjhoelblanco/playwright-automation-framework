import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    // Buscamos todos los links que son resultados de búsqueda
    this.results = page.locator('ol.ui-search-layout li');
  }

  async getResultsCount(): Promise<number> {
    // Esperamos que aparezca al menos uno antes de contar
    await this.results.first().waitFor({ state: 'visible' });
    return await this.results.count();
  }

  async clickFirstResult() {
    await this.results.first().click();
  }
}