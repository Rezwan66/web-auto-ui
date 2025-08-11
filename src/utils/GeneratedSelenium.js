import { Builder, By, until } from 'selenium-webdriver';

async function automateFormSubmission() {
  try {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:5173/form');

    // Wait for title input field to be present
    const titleInputField = await driver.wait(
      until.elementLocated(By.name('title')),
      5000
    );
    await driver.sleep(1000); // Pause to see automation
    await titleInputField.sendKeys('Ana De Armas');

    // Wait for details input field to be present
    const detailsInputField = await driver.wait(
      until.elementLocated(By.name('details')),
      5000
    );
    await driver.sleep(1000); // Pause to see automation
    await detailsInputField.sendKeys('Ballerina');

    // Wait for submit button and click it
    const submitButton = await driver.wait(
      until.elementLocated(By.id('postStoryButton')),
      5000
    );
    await driver.sleep(1000); // Pause to see automation
    await submitButton.click();
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

automateFormSubmission();
