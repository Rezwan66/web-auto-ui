import axios from 'axios';

export async function generateScript(prompt) {
  try {
    const response = await axios.post('http://localhost:8000/generate', {
      prompt,
    });
    return response.data.script;
  } catch (error) {
    console.error('Error generating script:', error);
    throw error;
  }
}
