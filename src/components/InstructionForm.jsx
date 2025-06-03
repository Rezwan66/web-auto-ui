import { useState } from 'react';
import { generateScriptHTTPX, generateScriptOllama } from '../api';
import CodeViewer from './CodeViewer';

const InstructionForm = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [selectedCodeType, setSelectedCodeType] = useState('python'); // Track the selected code type

  const handleAskLLM = async e => {
    e.preventDefault();
    const promptText = e.target.promptText.value;
    // console.log(promptText);
    try {
      const response = await generateScriptOllama(promptText);
      setGeneratedCode(response?.response);
      console.log('LLM Response:\n', response.response);
      // setJsCode(response?.js_code);
      // console.log('LLM Response:', response.response);
      // console.log('Generated Python code:', response?.python_code);
      // console.log('Generated JavaScript code:', response?.js_code);
    } catch (error) {
      console.log('Error: ', error);
    }
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

  return (
    <>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_5').showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-transparent glass text-white">
            <h3 className="font-bold text-lg">Enter Your Instructions!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <form
              onSubmit={handleAskLLM}
              action=""
              className="card-body text-black"
            >
              <label className="label text-white">Ask something?</label>
              <div className="join text-black">
                <input
                  type="text"
                  name="promptText"
                  className="input join-item"
                  placeholder="What do you want to do?"
                  id=""
                />
                <button type="submit" className="btn join-item rounded-r-full">
                  ask
                </button>
              </div>
            </form>
            {generatedCode && (
              <>
                <CodeViewer codeText={generatedCode} />
                {/* Button to trigger JS execution on the frontend */}
                {/* <button
                  onClick={executeJSCode}
                  className="btn btn-secondary mt-4"
                >
                  Run Frontend Automation
                </button> */}
              </>
            )}
            {/* {jsCode && <CodeViewer codeText={jsCode} />} Display JS code */}

            {/* modal action */}
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};
export default InstructionForm;
