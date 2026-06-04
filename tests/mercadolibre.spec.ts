import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('assertions de página', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(page).toHaveTitle(/Mercado Libre/);
  await expect(page).toHaveURL('https://www.mercadolibre.com.ar/');
});

test('assertions de elementos', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(homePage.searchInput).toBeVisible();
  await expect(homePage.searchInput).toBeEnabled();
  await expect(homePage.searchInput).toBeEmpty();
});

test('assertions de texto', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.search('notebook lenovo');

  await expect(page.getByRole('heading').first()).toContainText('notebook');
  await expect(page).toHaveURL(/notebook/i);
});

test('assertions de cantidad', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  await homePage.navigate();
  await homePage.search('notebook lenovo');

  await resultsPage.results.first().waitFor({ state: 'visible' });
  const count = await resultsPage.getResultsCount();

  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(100);
  expect(count).toBeGreaterThanOrEqual(10);
});