
import { Page, Locator,expect } from '@playwright/test';
import { Shared } from '../../../common/pages/shared';

export class AddToCart {
  private readonly page: Page;
  private readonly shared: Shared;

  // Locators
  private readonly addtoCartBTN: Locator;
 private readonly viewCartBTN:Locator;


  constructor(page: Page) {
    this.page = page;
    this.shared = new Shared(page);

    this.addtoCartBTN = page.locator('//div[contains(@class,"hidden flex-grow min-h-screen")]//button[normalize-space(.)="Add to cart"]');
    this.viewCartBTN = page.locator('//div[contains(@class,"hidden flex-grow min-h-screen")]//a[normalize-space(.)="View cart"]')

  }

 async clickAddToCart() {
    await this.shared.clickOnElement(this.addtoCartBTN)

  }

   async clickOnViewCartButton() {
    await this.shared.clickOnElement(this.viewCartBTN)
  }

  async moveToCartPage(){

    await this.clickAddToCart();
    await this.clickOnViewCartButton();
  }



}
