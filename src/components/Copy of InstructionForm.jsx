import { useEffect, useRef, useState } from 'react';
import {
  generateScriptHTTPX,
  generateScriptOllama,
  runPythonCode,
  runVisualAutomation,
} from '../api';
import CodeViewer from './CodeViewer';
import { FaRobot, FaTimes } from 'react-icons/fa';
import sampleCode from '../../public/sampleCode';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
// import { Builder, By, until } from 'selenium-webdriver';

const InstructionForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [generatedCode, setGeneratedCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [savedMetricId, setSavedMetricId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const modalRef = useRef(null);
  const location = useLocation();
  const windowLocation = window.location;

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
    const metadata = {
      url: 'http://localhost:5173/form',
      fields: [
        { tag: 'input', name: 'title' },
        { tag: 'textarea', name: 'details' },
      ],
      submit: { selector: '#postStoryButton' },
    };
    // console.log(promptText);
    try {
      const response = await generateScriptOllama(promptText, metadata);
      // setGeneratedCode(response?.response);
      // console.log('LLM Response Code:\n', response?.response);
      // console.log('LLM Generation Duration:\n', response?.total_duration_ms);
      // console.log('API Response Time:\n', response?.api_time_ms);
      // console.log('Stored Metric ID:\n', response?.metric_id);
      console.log('Actions from LLM:', response);
      setGeneratedCode(response?.code || sampleCode);

      // Try to run the code if it's JavaScript
      // if (response?.code?.includes('selenium-webdriver')) {
      // WARNING: Only run trusted code!
      // executeSeleniumCode(response?.code);
      // }
      // Execute the Selenium code in the user's browser
      // executeSeleniumCode(response);

      // setSavedMetricId(response?.metric_id);
      // await runVisualAutomation(metadata.url, response);
      // toast.success('Automation started—check your browser!');
      // setJsCode(response?.js_code);
      // console.log('LLM Response:', response.response);
      // console.log('Generated Python code:', response?.python_code);
      // console.log('Generated JavaScript code:', response?.js_code);
    } catch (error) {
      console.log('Error: ', error);
      // setGeneratedCode(sampleCode);
      toast.error('Failed to automate.');
    } finally {
      setIsLoading(false);
    }
    askingForm.reset();
  };

  // Execute Selenium code in the browser using JavaScript
  const executeSeleniumCode = seleniumCode => {
    try {
      // Remove import statements
      const codeWithoutImports = seleniumCode.replace(
        /^(import .*;|const .* = require\(.*\);)$/gm,
        ''
      );

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

  const runPythonOnBackend = async () => {
    console.log(generatedCode);
    console.log(savedMetricId);
    try {
      const response = await runPythonCode(generatedCode, savedMetricId);
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

  // async function runGeneratedWebDriverCode() {
  //   // Wrap it in an async function so `await` works
  //   const wrapped = new Function(
  //     'Builder',
  //     'By',
  //     'until',
  //     `
  //   (async () => {
  //     ${generatedCode}
  //   })().catch(console.error);
  //   `
  //   );
  //   // Invoke with the real APIs
  //   wrapped(Builder, By, until);
  // }

  const runDomAutomation = () => {
    try {
      const domScript = `
      document.querySelector('input[name="title"]').value = "Ana De Armas";
      document.querySelector('textarea[name="details"]').value = "Ballerina";
      document.getElementById('postStoryButton').click();
    `;
      // Run the code in the current page context
      // WARNING: Only run trusted code!
      // eslint-disable-next-line no-new-func
      new Function(domScript)();
      toast.success('DOM automation ran!');
    } catch (error) {
      toast.error('DOM automation failed!');
      console.error(error);
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
                    <label htmlFor="prompt-input" className="label mb-2">
                      <span className="label-text text-black">
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
                <div className="mb-6 w-full flex items-center justify-between">
                  <button
                    onClick={() => {
                      console.log(location);
                      console.log(windowLocation.href);
                    }}
                    className="btn btn-warning btn-xs"
                  >
                    Get URL
                  </button>
                  <button className="btn btn-info btn-xs">Get Metadata</button>
                  <button className="btn btn-success btn-xs">
                    Get Full JSON Body
                  </button>
                  <button
                    onClick={runDomAutomation}
                    className="btn btn-accent btn-xs"
                  >
                    Run JS DOM Automation
                  </button>
                </div>

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
                        Run Automation Backend
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
