import { Page, Locator } from '@playwright/test';

export class HomePage {
  // 1. Guardamos la página
  readonly page: Page;

  // 2. Declaramos los elementos
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  // 3. Constructor — inicializa todo
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('combobox', { name: 'Ingresá lo que quieras' });
    this.searchButton = page.getByRole('button', { name: 'Buscar' });
  }

  // 4. Métodos — acciones que se pueden hacer en esta página
  async navigate() {
    await this.page.goto('https://www.mercadolibre.com.ar');
  }

  async search(product: string) {
    await this.searchInput.click();
    await this.searchInput.fill(product);
    await this.page.keyboard.press('Enter');
  }
}