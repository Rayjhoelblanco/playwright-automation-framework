import { Page, Locator } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigate() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('button', { name: /Add/ }).click();
  }

  async fillEmployeeForm(firstName: string, middleName: string, lastName: string, empId: string) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.clear();
    await this.employeeIdInput.fill(empId);
  }

  async save() {
    await this.saveButton.click();
  }
   async editMiddleName(newMiddleName: string) {
  // Seleccionamos todo el texto y lo reemplazamos directamente
  await this.middleNameInput.click({ clickCount: 3 });
  await this.middleNameInput.fill(newMiddleName);

  // Guardamos con el form correcto
  await this.page.locator('form')
    .filter({ hasText: 'Employee Full' })
    .getByRole('button', { name: 'Save' })
    .click();

  // Esperamos el mensaje de éxito que muestra OrangeHRM
  await this.page.locator('.oxd-toast--success').waitFor({ state: 'visible', timeout: 8000 });
}
  }
