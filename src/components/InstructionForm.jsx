import { useEffect, useRef, useState } from 'react';
import {
  generateScriptHTTPX,
  generateScriptOllama,
  runPythonCode,
} from '../api';
import CodeViewer from './CodeViewer';
import { FaRobot, FaTimes } from 'react-icons/fa';
import sampleCode from '../../public/sampleCode';
import toast from 'react-hot-toast';

const InstructionForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [generatedCode, setGeneratedCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleAskLLM = async e => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedCode(''); // Clear previous results
    const askingForm = e.target;
    const promptText = e.target.promptText.value;
    // console.log(promptText);
    try {
      const response = await generateScriptOllama(promptText);
      // setGeneratedCode(response?.response);
      console.log('LLM Response:\n', response?.response);
      console.log('LLM Generation Duration:\n', response?.total_duration);
      console.log('API Response Time:\n', response?.api_time_ms);
      setGeneratedCode(response?.response || sampleCode);
      // setJsCode(response?.js_code);
      // console.log('LLM Response:', response.response);
      // console.log('Generated Python code:', response?.python_code);
      // console.log('Generated JavaScript code:', response?.js_code);
    } catch (error) {
      console.log('Error: ', error);
      setGeneratedCode(sampleCode);
    } finally {
      setIsLoading(false);
    }
    askingForm.reset();
  };
  // Function to run the JavaScript code on the frontend
  // const executeJSCode = () => {
  //   if (jsCode) {
  //     eval(jsCode); // Executes the JS code directly on the frontend (with caution)
  //   }
  // };
  // ###################################################
  // const executeJSCode = () => {
  //   if (generatedCode) {
  //     try {
  //       // This will attempt to run the code snippet in the user’s browser
  //       // (Be cautious: Ɛval can be risky if untrusted.)
  //       // Make sure your UI is trusted and only used in development or controlled context.
  //       // You might also wrap in a Function() for slightly safer scope handling:
  //       new Function(generatedCode)();
  //     } catch (e) {
  //       console.error('Error executing JS:', e);
  //     }
  //   }
  // };

  const runPythonOnBackend = async () => {
    console.log(generatedCode);
    try {
      const response = await runPythonCode(generatedCode);
      const data = response.data;
      // alert(`Backend Selenium ran successfully:\n${data.output}`);
      toast.success(`Backend Selenium ran successfully:\n${data.output}`);
    } catch (error) {
      console.error('Error calling backend:', error);
      toast.error('Error calling backend:', error);
      if (error.response) {
        // Backend returned a 4xx or 5xx
        const detail =
          error.response.data?.detail ||
          error.response.data?.output ||
          'Unknown error';
        toast.error(`ServerError: ${detail}`);
        console.log(`ServerError: ${detail}`);
      } else {
        // Network or other errors
        // alert('Network error or no response from server.');
        toast.error('Network error or no response from server.');
      }
    }
  };

  return (
    <>
      <div>
        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="btn btn-xl btn-circle btn-primary shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Open AI assistant"
            onClick={() => setIsModalOpen(true)}
          >
            <FaRobot className="w-8 h-8" />
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className="bg-base-100 rounded-box shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-base-100 z-10 p-4 border-b border-base-300 flex justify-between items-center">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <FaRobot className="text-primary" /> AI Automation Assistant
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleAskLLM} className="mb-6">
                  <div className="form-control">
                    <label htmlFor="prompt-input" className="label">
                      <span className="label-text">
                        What would you like to automate?
                      </span>
                    </label>
                    <textarea
                      id="prompt-input"
                      name="promptText"
                      className={`textarea textarea-bordered w-full mb-2 ${
                        isLoading ? 'opacity-70' : ''
                      }`}
                      placeholder="Describe what you want to automate..."
                      disabled={isLoading}
                      aria-describedby="prompt-help"
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn btn-primary flex items-center gap-2"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Generating...
                          </>
                        ) : (
                          'Generate'
                        )}
                      </button>
                    </div>
                    <div
                      id="prompt-help"
                      className="text-sm mt-2 text-gray-500"
                    >
                      Example: "Fill out the contact form with test data"
                    </div>
                  </div>
                </form>

                {isLoading ? (
                  <div className="flex justify-center items-center h-40 mb-6">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <span className="ml-3">Generating automation code...</span>
                  </div>
                ) : generatedCode ? (
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-2">Generated Code:</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <CodeViewer codeText={generatedCode} />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedCode);
                          setCodeCopied(true);
                        }}
                        className="btn btn-outline btn-sm"
                      >
                        {codeCopied ? '✅ Copied' : 'Copy Code'}
                      </button>
                      <button
                        onClick={runPythonOnBackend}
                        className="btn btn-secondary btn-sm"
                      >
                        Run Automation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-base-200 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-lg mb-2">How it works:</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Describe what you want to automate in natural language
                      </li>
                      <li>Our AI will generate the automation code</li>
                      <li>Review and run the automation directly</li>
                      <li>Watch the magic happen!</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default InstructionForm;
