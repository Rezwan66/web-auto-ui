import axios from 'axios';

// Configure base URL (for development/production)
const API = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your backend URL in production
});

// LLM Call API Functions
export const generateScriptOllama = async (
  prompt,
  metadata,
  useCase,
  iteration
) => {
  try {
    console.log(prompt, metadata);
    const { data } = await API.post('/llm/generate', {
      prompt,
      metadata,
      useCase,
      iteration,
    });
    console.log(data);
    return data; // { response: "<generated code>" }
  } catch (error) {
    console.error('Error generating script:', error);
    throw error;
  }
};
export const generateScriptHTTPX = async prompt => {
  try {
    console.log({ prompt });
    const response = await API.post('/llm/generate-llm', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error generating script:', error);
    throw error;
  }
};

// form page API
export const submitForm = async formData => {
  try {
    const response = await API.post('/formfill/submit-form', formData);
    // console.log(response);
    return response?.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
export const getFormData = async () => {
  try {
    const response = await API.get('/formfill/get-form-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw error;
  }
};

// Test-automation run Python Code on Backend
export const runPythonCode = async (generatedCode, metric_id) => {
  // Always return the Axios promise so the caller can catch errors
  return API.post('/automation/run-python-code', {
    code: generatedCode,
    metric_id,
  });
};

// at bottom of src/api.js

// Run visual automation via Playwright
export const runVisualAutomation = async (url, actions) => {
  try {
    const { data } = await API.post('/automation/run-visual-automation', {
      url,
      actions,
    });
    console.log('Visual automation started:', data);
    return data;
  } catch (err) {
    console.error('Error starting visual automation:', err);
    throw err;
  }
};
