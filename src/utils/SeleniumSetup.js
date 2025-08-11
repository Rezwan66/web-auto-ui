import { Builder, By, until } from 'selenium-webdriver';

export async function setupDriver() {
  const driver = await new Builder().forBrowser('chrome').build();
  driver
    .navigate()
    .to('http://localhost:5173/form')
    .then(() => driver.findElement(By.name('title')))
    .then(element => element.sendKeys('Sydney Sweeney'))
    .then(() => driver.findElement(By.name('details')))
    .then(element => element.sendKeys('Euphoria'))
    .then(() => driver.findElement(By.id('postStoryButton')))
    .then(element => element.click());
  //   return driver;
}

setupDriver();
