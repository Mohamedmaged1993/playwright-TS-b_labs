import { Page, Locator,expect} from '@playwright/test';

export class Shared {
  constructor(private page: Page) {}
  

 async clickOnElement(element: Locator, waitState: 'visible' | 'attached' | 'hidden' | 'detached' = 'visible', clickOptions?: Parameters<Locator['click']>[0]) {
    await element.waitFor({ state: waitState });
    await element.click(clickOptions);
  }

async fillInput(el: Locator, value: string, timeout = 8000) {
  await el.evaluate(n => n.scrollIntoView({ block: 'center', inline: 'nearest' }));

  await el.evaluate(n => (n as HTMLElement).focus());
  await el.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await el.press('Delete');

  await el.fill(value);
  const filledOk = await expect
    .poll(async () => el.inputValue(), { timeout: Math.min(2000, timeout), message: 'verify fill()' })
    .toBe(value)
    .then(() => true)
    .catch(() => false);
  if (filledOk) return;

  const chunkSize = 4;
  for (let i = 0; i < value.length; i += chunkSize) {
    const curr = await el.inputValue().catch(() => '');
    if (curr === value) break;

    await el.evaluate(node => (node as HTMLElement).focus()).catch(() => {});

    const piece = value.slice(i, i + chunkSize);
    await el.type(piece, { delay: 60 });

    const expectedLen = Math.min(i + chunkSize, value.length);
    const progressed = await expect
      .poll(async () => (await el.inputValue()).length, { timeout: 800 })
      .toBeGreaterThanOrEqual(expectedLen)
      .then(() => true)
      .catch(() => false);

    if (!progressed) {
      await el.evaluate(node => (node as HTMLElement).focus()).catch(() => {});
      await el.type(piece, { delay: 60 });
    }
  }

  const finalVal = await el.inputValue().catch(() => '');
  if (finalVal !== value) {
    await el.evaluate((node, v) => {
      const input = node as HTMLInputElement;
      input.value = v;
      input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }, value);
    await expect
      .poll(async () => el.inputValue(), { timeout: 1500, message: 'verify  set' })
      .toBe(value);
  }
}



}