import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';


test('should register a lead on the queue', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.openPage()
  await landingPage.openJoinUserWaitingList();
  await landingPage.joinUserWaitingListRandomInfo('VVV', 'vv@vv.com');

  const toastSuccessfulText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

  await landingPage.validateToastHasText(toastSuccessfulText);
});


test("shouldn't register with email poorly formatted", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.openPage()
  await landingPage.openJoinUserWaitingList();
  await landingPage.joinUserWaitingListRandomInfo('VVV', 'vvwrongemail');

  await landingPage.mandatoryFieldWarningShouldHaveText("Email incorreto");
});

test("shouldn't register with mandatory fields not filled", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.openPage()
  await landingPage.openJoinUserWaitingList();
  await landingPage.joinUserWaitingListRandomInfo('', '');

  await landingPage.mandatoryFieldWarningShouldHaveText([
    'Campo obrigatório', 'Campo obrigatório']);
});

