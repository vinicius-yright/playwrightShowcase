import { expect } from '@playwright/test';

export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async openPage() {
        await this.page.goto('http://localhost:3000/');
    }

    async openJoinUserWaitingList() {
        // await page.click('//button[text()="Aperte o play... se tiver coragem"]');

        await this.page.getByText(/Aperte o play/).click();

        //checkpoint
        await expect(
            this.page.getByTestId('modal').getByRole('heading'))
            .toHaveText('Fila de espera');
    }

    async joinUserWaitingListRandomInfo(name, email) {
        //# = id css selector

        await this.page.locator('#name').fill(name);
        //css for name attribute
        await this.page.locator('input[name=email]').fill(email);

        await this.page.getByText('Quero entrar na fila!').click();
    }

    async mandatoryFieldWarningShouldHaveText(text) {
        expect(this.page.locator(".alert")).toHaveText(text);
    }

    async validateToastHasText(text) {
        // . is for searching class name
        const toastLocator = this.page.locator('.toast')

        await expect(toastLocator).toHaveText(text);
        await expect(toastLocator).toBeHidden({ timeout: 5000 });
    }
}