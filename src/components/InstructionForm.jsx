import { useState } from 'react';
import { generateScript } from '../api';
import CodeViewer from './CodeViewer';

const InstructionForm = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const handleAskLLM = async e => {
    e.preventDefault();
    const promptText = e.target.promptText.value;
    // console.log(promptText);
    try {
      const response = await generateScript(promptText);
      setGeneratedCode(response?.response);
      console.log('LLM Response:', response.response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
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
            <h3 className="font-bold text-lg">Hello!</h3>
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
            {generatedCode && <CodeViewer codeText={generatedCode} />}
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
