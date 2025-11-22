
import { Page, Locator,expect } from '@playwright/test';
import { Shared } from '../../../common/pages/shared';
import { DeviceRecord } from '../homeTypes/homeTypes';
import { loadJson } from '../../../utils/dataLoader';


export class HomePage {
  private readonly page: Page;
  private readonly shared: Shared;

  // Locators
  private readonly searchBarInput: Locator;
 private readonly iphone:Locator;
 private readonly englishLanguageSelection:Locator
 private readonly iphoneImage:Locator


  constructor(page: Page) {
    this.page = page;
    this.shared = new Shared(page);

    this.searchBarInput = page.locator('//div[contains(@class,"hidden laptop:block")]//input[@data-testid="search-input"]');
    this.iphone = page.locator('//a[contains(@title,"Apple iPhone 16")]')
    this.englishLanguageSelection = page.locator('//img[@alt="change language"]')
   this.iphoneImage = page.locator('//img[contains(@alt,"Apple iPhone 16")]');

  }

    async searchIphoneDevice(): Promise<DeviceRecord> {
    const devices = await loadJson<DeviceRecord[]>(
      'src/domain/homeManagement/homeTestData/devices.json'
    );
    const device = devices[0]; 
    if (!device) throw new Error('No devices found in devices.json');
    await this.clickSearchInput();
    await this.shared.fillInput(this.searchBarInput,device.mobileDevicesModel);
    await this.searchBarInput.focus();
    await this.searchBarInput.press('Enter');
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('networkidle');

    return device;
  }
  

 async clickSearchInput() {
    await this.shared.clickOnElement(this.searchBarInput);
    
  }

async clickFirstIphone16() {
  const firstIphoneImage = this.iphoneImage.first();
  const firstIphoneLink = this.iphone.first();

  await expect(firstIphoneImage).toBeVisible();
  await firstIphoneLink.click();
  await expect(this.page).toHaveURL(/\/en\/p\/apple/);

}



  async changeToEnglishLanguage(){
    await this.shared.clickOnElement(this.englishLanguageSelection);
    await this.assertEnglishPageUrl()
  }
async assertEnglishPageUrl() {
  const url = process.env.EN_PAGE_URL!;
  await expect(this.page).toHaveURL(url);
}
async assertIphonePageUrl(device: DeviceRecord) {
  const searchQueryPageURL = process.env.Search_Query_PAGE_URL!;
  const expectedUrl = `${searchQueryPageURL}${device.mobileDevicesModel}`;
  await expect(this.page).toHaveURL(expectedUrl);
}



}
