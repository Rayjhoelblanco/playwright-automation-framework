import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';

test('login exitoso con credenciales válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  // Verificamos que la página de login cargó
  await expect(page).toHaveTitle(/OrangeHRM/);
  await expect(loginPage.loginButton).toBeVisible();

  // Login
  await loginPage.login('Admin', 'admin123');

  // Verificamos que entramos al dashboard
  await expect(page).toHaveURL(/dashboard/);
});

test('login fallido con credenciales inválidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  await loginPage.login('usuario_falso', 'clave_falsa');

  // Verificamos el mensaje de error
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Invalid credentials');
});

test('campos de login visibles y habilitados', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.usernameInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeEmpty();
  await expect(loginPage.loginButton).toBeEnabled();
})

test('crear un empleado nuevo exitosamente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const addEmployeePage = new AddEmployeePage(page);

  // ID único usando timestamp — nunca se repite
  const empId = Date.now().toString().slice(-5);

  // 1. Login
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);

  // 2. Navegar a Add Employee
  await addEmployeePage.navigate();
  await expect(page).toHaveURL(/addEmployee/);

  // 3. Completar formulario
  await addEmployeePage.fillEmployeeForm('Ray', 'QA', 'Blanco', empId);

  // 4. Guardar y esperar redirección
  await addEmployeePage.save();
  await page.waitForURL(/viewPersonalDetails/, { timeout: 10000 });

  // 5. Verificar nombre guardado correctamente
  await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('Ray');
  await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Blanco');
})

test('buscar y editar empleado existente', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchEmployeePage(page);
  const addEmployeePage = new AddEmployeePage(page);

  // 1. Login
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);

  // 2. Ir a PIM y buscar
  await searchPage.navigate();
  await searchPage.searchEmployee('Ray');

  // 3. Verificar que encontró resultados
  await expect(searchPage.tableRows.first()).toBeVisible();
  const nombre = await searchPage.getFirstResultName();
  expect(nombre).toContain('Ray');

   // 4. Click en editar
await searchPage.clickEditOnFirstResult();
await page.waitForURL(/viewPersonalDetails/, { timeout: 10000 });

  // 5. Editar el middle name
  await addEmployeePage.editMiddleName('Automation');

 // 6. Verificar que se guardó — esperamos el toast y recargamos
  await page.reload();
  await expect(addEmployeePage.middleNameInput).toHaveValue('Automation');
});