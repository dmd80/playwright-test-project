---
name: qa-code-reviewer
description: Expert code review for Playwright tests, QA best practices, and test automation guidance based on 2025-2026 standards.
allowed-tools: Read Grep Glob
---

# QA Code Reviewer

## Overview

This skill provides expert feedback on Playwright test code, test automation best practices, and QA engineering guidance based on 2025-2026 industry standards.

## Project Context

Your Playwright project tests against **saucedemo.com** with the following structure:

### Test Files
- `tests/test_checkout.spec.ts` - 3 tests: checkout process, specific product, multiple products
- `tests/test_product_links.spec.ts` - 1 test: validates all 6 product links navigate correctly
- `tests/test_product_list_page.spec.ts` - 2 tests: add/remove cart functionality (+ negative test with performance_glitch_user)

### Page Objects
- `pages/home_page.ts` - Login with 6 user types
- `pages/list_page.ts` - Product selection, add/remove cart
- `pages/product_page.ts` - Product details, add to cart
- `pages/cart_page.ts` - Cart amount, checkout navigation
- `pages/checkout_page.ts` - Form filling with faker, finish checkout

### Configuration
- Test directory: `./tests`
- Reporter: HTML
- Browsers: Chromium, Firefox, Webkit
- Trace: on-first-retry
- Test ID attribute: `data-test`

## Known Issues / Areas for Improvement

Based on codebase analysis and 2026 best practices:

1. **Hardcoded credentials** in `home_page.ts` - security concern
2. **No baseURL** configured - tests hit URL directly
3. **No webServer** - depends on external site
4. **Missing ESLint** for Playwright patterns
5. **No TypeScript strict mode**
6. **Test isolation** - shares state with saucedemo.com

## QA Best Practices (2026)

### Test Design
- Test user-visible behavior, not implementation details
- Use role-based locators: `getByRole`, `getByLabel`, `getByPlaceholder`
- Prefer semantic selectors over CSS/XPath
- Each test should be isolated with own data setup/teardown
- Use soft assertions (`expect.soft`) for non-critical checks

### Locator Priority
1. `getByRole()` - accessibility semantics
2. `getByLabel()` - form fields
3. `getByPlaceholder()` - input hints
4. `getByText()` - visible text
5. `getByTestId()` - last resort

### Common Anti-Patterns to Avoid
- `waitForTimeout()` - use auto-waiting instead
- Hardcoded waits - Playwright handles timing
- `networkidle` - brittle signal
- Testing third-party dependencies - mock with `page.route()`
- CSS selectors tied to implementation
- Tests depending on each other

### Test Pyramid
- ~70% Unit tests
- ~20% Integration/API tests
- ~10% E2E tests

### CI/CD Integration
- Run tests on every PR
- Use parallel execution (`fullyParallel: true`)
- Configure retries for CI
- Cache browser binaries
- Publish HTML reports as artifacts

### AI Integration (2026 Trend)
- 72% of QA professionals use AI for test generation
- Self-healing locators adapt to UI changes
- Use AI for: test generation, failure analysis, coverage optimization

## Senior QA Engineer Skills (2026)

| Priority | Skill |
|----------|-------|
| 1 | Modern automation frameworks (Playwright, Cypress) |
| 2 | Programming (Python/JavaScript) |
| 3 | CI/CD (GitHub Actions, Jenkins, Docker) |
| 4 | API testing (REST, GraphQL) |
| 5 | AI tools literacy |
| 6 | Performance testing |
| 7 | Communication & collaboration |

## Review Checklist

When reviewing test code, check for:

### Locators
- [ ] Using role-based selectors
- [ ] No fragile CSS/XPath
- [ ] Test IDs as fallback only

### Assertions
- [ ] Web-first assertions (`toBeVisible`, `toHaveText`)
- [ ] Soft assertions where appropriate
- [ ] Retry-ability built-in

### Test Structure
- [ ] Isolated tests
- [ ] No shared state
- [ ] Proper setup/teardown
- [ ] Focused, single responsibility

### Configuration
- [ ] baseURL configured
- [ ] Environment variables for credentials
- [ ] Retry strategy for CI
- [ ] Parallel execution

### Maintainability
- [ ] Page Object Model used
- [ ] No code duplication
- [ ] Clear test names
- [ ] Documentation for complex flows

## Commands

### Run Tests
```bash
npx playwright test
npx playwright test --headed
npx playwright test --trace on
```

### Debug
```bash
npx playwright show-trace trace.zip
```

### Lint
```bash
npm install -D eslint-plugin-playwright
```

## References

- Playwright Best Practices: https://playwright.dev/docs/best-practices
- Katalon State of Software Quality Report 2025
- BrowserStack Playwright Best Practices 2026

## Usage

When providing feedback, reference:
- Specific line numbers from the codebase
- The 2026 best practice being violated
- Concrete fix recommendation
- Priority level (critical/high/medium/low)

Base directory for this skill: file:///home/ded/playwright-project/.claude/skills/qa-code-reviewer