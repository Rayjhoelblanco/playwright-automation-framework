import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import employees from '../data/employees.json';

test.setTimeout(60000);

for (const employee of employees) {
  test(`crear empleado: ${employee.firstName} ${employee.lastName}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'firefox', 'Servidor demo lento en Firefox');

    const loginPage = new LoginPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    const uniqueId = `${testInfo.workerIndex}${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 99)}`;

    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);

    await addEmployeePage.navigate();
    await expect(page).toHaveURL(/addEmployee/);

    await addEmployeePage.fillEmployeeForm(
      employee.firstName,
      employee.middleName,
      employee.lastName,
      uniqueId
    );

    await addEmployeePage.save();
    await page.waitForURL(/viewPersonalDetails/, { timeout: 30000 });

    await expect(page.getByRole('textbox', { name: 'First Name' }))
      .toHaveValue(employee.firstName);
    await expect(page.getByRole('textbox', { name: 'Last Name' }))
      .toHaveValue(employee.lastName);
  });
}