import axios from 'axios';

// Configure base URL (for development/production)
const API = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your backend URL in production
});

// API Functions
export const generateScript = async prompt => {
  try {
    console.log({ prompt });
    const response = await API.post('/llm/generate-llm', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error generating script:', error);
    throw error;
  }
};

export const submitForm = async formData => {
  try {
    const response = await API.post('/submit-form', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

export const getFormData = async () => {
  try {
    const response = await API.get('/get-form-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw error;
  }
};
