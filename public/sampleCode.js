const sampleCode = `
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)
driver.get("http://localhost:5173/form")

title_field = driver.find_element(By.NAME, "title")
title_field.send_keys("Sample Title")

details_field = driver.find_element(By.NAME, "details")
details_field.send_keys("Some detailed information.")

submit_button = driver.find_element(By.XPATH, "//button[text()='Post']")
submit_button.click()

driver.quit()
`;

export default sampleCode;
