import { Page, Locator } from '@playwright/test';

export class SearchEmployeePage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
  }

  async navigate() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
  }

  async searchEmployee(name: string) {
    await this.employeeNameInput.click();
    await this.employeeNameInput.fill(name);
    // Esperamos el dropdown de sugerencias y seleccionamos
    await this.page.getByRole('option', { name: new RegExp(name, 'i') }).first().click();
    await this.searchButton.click();
  }

  async clickEditOnFirstResult() {
  await this.tableRows.first().waitFor({ state: 'visible' });
  // Esperamos un momento para que la tabla cargue completamente
  await this.page.waitForTimeout(1000);
  // El ícono de editar es el primer botón con el svg de lápiz
  const editButton = this.tableRows.first().locator('button i.bi-pencil-fill').locator('..');
  await editButton.click();
}

  async getFirstResultName(): Promise<string> {
    await this.tableRows.first().waitFor({ state: 'visible' });
    const nameCell = this.tableRows.first().locator('.oxd-table-cell').nth(2);
    return await nameCell.innerText();
  }
}