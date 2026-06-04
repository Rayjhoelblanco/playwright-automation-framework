# Playwright Automation Framework 🎭

![Playwright Tests](https://github.com/Rayjhoelblanco/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)

Framework de automatización de pruebas E2E construido con **Playwright + TypeScript**.

## 🛠️ Stack Tecnológico
- Playwright 
- TypeScript
- Node.js
- Page Object Model (POM)
- Data Driven Testing (DDT)

## 📁 Estructura del Proyecto
playwright-curso/
├── pages/              # Page Objects
│   ├── LoginPage.ts
│   ├── AddEmployeePage.ts
│   └── SearchEmployeePage.ts
├── tests/              # Test Suites
│   ├── orangehrm.spec.ts
│   ├── orangehrm-ddt.spec.ts
│   └── mercadolibre.spec.ts
├── data/               # Test Data
│   └── employees.json
└── playwright.config.ts

## 🧪 Casos de Prueba
### OrangeHRM (Sistema RRHH)
- ✅ Login exitoso y fallido
- ✅ Crear empleado nuevo
- ✅ Buscar y editar empleado
- ✅ Data Driven Testing — creación masiva de empleados

### MercadoLibre
- ✅ Carga de página
- ✅ Búsqueda de productos

## 🚀 Cómo ejecutar

### Instalar dependencias
```bash
npm install
npx playwright install
```

### Correr todos los tests
```bash
npx playwright test
```

### Correr suite específica
```bash
npx playwright test orangehrm.spec.ts
```

### Ver reporte HTML
```bash
npx playwright show-report
```

## 👤 Autor
Ray Blanco — QA Automation Engineer