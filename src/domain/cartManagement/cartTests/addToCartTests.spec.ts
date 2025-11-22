import { test, expect } from '../../../support/e2e';



test.describe('Add To Cart Tests', () => {
  test.describe.configure({ timeout: 40_000 });

  test('Verify User Moves To Cart Successfully', async ({ home, cart }) => {
   

    await home.changeToEnglishLanguage();
    const deviceName = await home.searchIphoneDevice();
    await home.assertIphonePageUrl(deviceName);
    await home.clickFirstIphone16();
    await cart.moveToCartPage()

  });

});
