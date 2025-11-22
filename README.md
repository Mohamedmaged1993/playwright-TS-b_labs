# Playwright UI Automation – B.TECH (btech.com)

End-to-end UI automation project for **btech.com** using **Playwright + TypeScript**, with a clean Page Object Model, custom fixtures, and `.env`-driven configuration.

This project currently covers:

* Home page behavior (language switch, search, product navigation)
* Add-to-Cart flow (from search → product → cart)

---

## Tech Stack

* **Language:** TypeScript
* **Test Runner:** Playwright Test
* **Pattern:** Page Object Model (POM)
* **Config:** `.env` via `dotenv`
* **Browsers:** Chromium, Firefox, WebKit

---

## Project Structure (High Level)

```
playwright-blabs/
├─ src/
│  ├─ config/
│  │  └─ .env
│  ├─ auth/
│  │  └─ authPage.ts
│  ├─ common/
│  │  ├─ pages/
│  │  │  └─ shared.ts
│  │  └─ utils/
│  │     └─ dataLoader.ts
│  ├─ domain/
│  │  ├─ homeManagement/
│  │  │  ├─ homeTypes/
│  │  │  │  └─ homeTypes.ts
│  │  │  ├─ homeTestData/
│  │  │  │  └─ devices.json
│  │  │  └─ pages/
│  │  │     └─ homepage.ts
│  │  └─ cartManagement/
│  │     ├─ pages/
│  │     │  └─ addTocartPage.ts
│  │     └─ cartTests/
│  │        └─ addToCartTests.spec.ts
│  ├─ support/
│  │  └─ e2e.ts
│  └─ playwright.config.ts
└─ README.md

```

---

## Environment Configuration

Environment variables are loaded from:

```
config/.env
```

Example:

```
BASE_URL=https://btech.com

```


# How to Install & Run the Project

## ** Install Node dependencies**

```
npm install
```

---

## ** Install Playwright Browsers**

Install all browsers:

```
npx playwright install
```

Only Chromium:

```
npx playwright install chromium
```

---

## **Run All Tests (All Browsers)**

```
npx playwright test
```

---

## **Run Tests in Chromium (Headed Mode)**

Run with real Chrome UI visible:

```
npx playwright test --project=chromium --headed
```

Run a specific test file:

```
npx playwright test src/domain/cartManagement/cartTests/addToCartTests.spec.ts --project=chromium --headed
```

---

## ** Run a Single Test by Name**

```
npx playwright test -g "Verify User Moves To Cart Successfully"
```

---

## ** View HTML Test Report**

```
npx playwright show-report
```

---

## **Run Tests in Playwright UI Mode**

Interactive mode:

```
npx playwright test --ui
```

---


