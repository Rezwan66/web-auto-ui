# Web Automation Code Generation with LLMs — Project Notes

## Overview

This document summarizes the design, implementation, and evaluation considerations for a system that uses Large Language Models (LLMs) to generate Selenium-based web automation code, integrating both frontend and backend execution, and supporting user-driven automation scenarios.

---

## 1. Project Structure

- **Frontend:**

  - React app with a modal UI (`InstructionForm.jsx`) for user prompts and code display.
  - Code execution for JavaScript Selenium code (Node.js).
  - Option to send Python Selenium code to backend for execution.

- **Backend:**
  - Python FastAPI server.
  - Calls Ollama LLM to generate code based on user prompt and page metadata.
  - Returns generated code and timing metrics.

---

## 2. Code Generation Flow

1. **User enters a prompt** describing the automation task.
2. **Frontend sends prompt and page metadata** to backend.
3. **Backend constructs a detailed prompt** for the LLM, including:
   - Task description
   - Page metadata (fields, selectors, URL)
   - Instructions for code structure and imports
4. **LLM generates code** (JS or Python, as specified).
5. **Frontend displays the code** and optionally executes it (if JS).
6. **User can run Python code on backend** if desired.

---

## 3. Handling Generated Code

### JavaScript (Node.js) Selenium Code

- **Execution:**

  - Use `new Function()` to run generated code.
  - Must strip out `import` statements, as dynamic evaluation does not support them.
  - Optionally, wrap code in a function and inject required objects (`Builder`, `By`, `until`).

- **Example Execution Wrapper:**

  ```javascript
  import { Builder, By, until } from 'selenium-webdriver';

  const executeSeleniumCode = seleniumCode => {
    try {
      // Remove import statements
      const codeWithoutImports = seleniumCode.replace(/^import .*;$/gm, '');
      // Wrap in async function and provide Selenium objects
      const wrapped = new Function(
        'Builder',
        'By',
        'until',
        `
        (async () => {
          ${codeWithoutImports}
        })().catch(console.error);
      `
      );
      wrapped(Builder, By, until);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error executing Selenium code:', error);
      setIsSuccess(false);
    }
  };
  ```

- **LLM Prompting:**
  - Instruct the LLM to include correct imports for evaluation purposes.
  - For execution, strip imports or provide objects as arguments.

### Python Selenium Code

- **Execution:**
  - Sent to backend for execution via API.
  - Backend runs the code and returns output.

---

## 4. Evaluation Criteria for LLM-Generated Code

- **Correct Imports:**
  - Code should include necessary import statements for the target language.
- **Correct Selectors:**
  - Code should use selectors (id, name, etc.) as specified in the provided metadata.
- **Code Structure:**
  - Should follow the task steps: open browser, navigate, fill fields, submit, etc.
- **User Experience:**
  - For demo purposes, code should not close the browser immediately and may include delays (`sleep`) between actions.

---

## 5. Example Backend Prompt for LLM

```python
detailed_prompt = f"""
Generate a complete, runnable frontend Selenium WebDriver script that does exactly this:
1. Launches a new Chrome browser window.
2. Navigates to {url}.
3. Fills in the form fields as described in the metadata.
4. Clicks the submit button.
5. Leaves the browser window open so you can see the result.

Task:
{prompt}

Instructions:
- Use the official Selenium WebDriverJS API import {{ 'Builder, By, until' }} from 'selenium-webdriver';.
- Begin with all necessary imports and `async` boilerplate.
- Use `await driver.get("{url}")`.
- Locate elements via the selectors from the metadata, then in priority order: `id`, then `name`, then CSS selector.
- Use `await driver.wait(until.elementLocated(By.X(...)), 5000);` before each interaction.
- Include error handling via `try/catch`.
- Only return the raw code (no commentary).
- Do NOT call driver.quit() at the end.
- Add a 1 second pause between each action so the user can see the automation.

{meta_block}
"""
```

---

## 6. Error Handling & Security

- **Dynamic code execution is dangerous!**

  - Only run trusted/generated code in a controlled environment.
  - Always strip or sandbox imports and sensitive operations.

- **Common Error:**
  - `SyntaxError: Cannot use import statement outside a module`
    - Solution: Remove import statements before dynamic execution.

---

## 7. Thesis Evaluation Recommendations

- **Display the full generated code (with imports) for review.**
- **For execution, preprocess code as needed.**
- **Automate checks for:**
  - Presence and correctness of imports.
  - Use of selectors from metadata.
  - Proper code structure and error handling.

---

## 8. Summary Table

| Code Location          | Language | Runs Where?        | Browser Visible?  | Closes Browser? | Use Case               |
| ---------------------- | -------- | ------------------ | ----------------- | --------------- | ---------------------- |
| SeleniumSetup.js       | JS       | Node.js (frontend) | Yes               | No              | Demo/test in dev       |
| sampleCode.js          | Python   | Backend server     | Maybe (if server) | Yes             | Backend automation     |
| LLM-generated (JS)     | JS       | Node.js/frontend   | Yes               | Depends on code | User-facing automation |
| LLM-generated (Python) | Python   | Backend server     | Maybe             | Yes             | Backend automation     |

---

## 9. References

- [Selenium WebDriverJS Docs](https://www.selenium.dev/selenium/docs/api/javascript/)
- [Selenium Python Docs](https://selenium-python.readthedocs.io/)
- [Ollama LLM](https://ollama.com/)
- [React Documentation](https://react.dev/)

---

\*Prepared for thesis documentation and project
