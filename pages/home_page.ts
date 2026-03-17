import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Represents the home page of the saucedemo website.
 * Provides methods to interact with the initial login and home page.
 */
export class HomePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // Predefined login credentials for testing purposes. Normally these would be stored securely and not hardcoded.
  readonly standardUser: string = 'standard_user';
  readonly lockedOutUser: string = 'locked_out_user';
  readonly problemUser: string = 'problem_user';
  readonly performanceGlitchUser: string = 'performance_glitch_user';
  readonly error_user: string = 'error_user';
  readonly visual_user: string = 'visual_user';
  readonly password: string = 'secret_sauce';


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string = 'standard_user') {
    let username: string;
    let password: string;

    switch (user) {
      case 'standard_user':
        username = this.standardUser;
        password = this.password;
        break;
      case 'locked_out_user':
        username = this.lockedOutUser;
        password = this.password;
        break;
      case 'problem_user':
        username = this.problemUser;
        password = this.password;
        break;
      case 'performance_glitch_user':
        username = this.performanceGlitchUser;
        password = this.password;
        break;
      case 'error_user':
        username = this.error_user;
        password = this.password;
        break;
      case 'visual_user':
        username = this.visual_user;
        password = this.password;
        break;
      default:
        throw new Error(`Unknown user: ${user}`);
    }

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}