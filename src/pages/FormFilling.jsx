import { useEffect } from 'react';
import { getFormData, submitForm } from '../api';
import { fillAndSubmitForm } from '../utils/TestJSAutomation';
import toast from 'react-hot-toast';

const FormFilling = () => {
  const handlePostStory = async e => {
    e.preventDefault();
    const myForm = e.target;
    const title = e.target.title.value;
    const details = e.target.details.value;
    const postData = {
      title,
      details,
    };
    console.log('submitted', postData);

    try {
      const response = await submitForm(postData);
      console.log('Backend Response:', response?.received, response?.status);
      // alert(`Success: ${JSON.stringify(response?.received)}`);
      toast.success(
        `Successfully posted: ${JSON.stringify(response?.received)}`
      );
      myForm.reset();
    } catch (error) {
      console.log('Error posting story: ', error);
    }
  };
  // useEffect(() => {
  //   // Optionally fetch data from GET endpoint when component mounts
  //   const fetchData = async () => {
  //     try {
  //       const data = await getFormData();
  //       console.log('GET data from backend:', data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        {/* <h2> HELLO I Am FormFilling </h2> */}
        <div className="hero bg-transparent mt-20 lg:mt-40 relative">
          {/* Content container */}
          <div className="hero-content flex-col lg:flex-row gap-10 z-10">
            {/* text */}
            <div className="text-center lg:text-left max-w-2xl text-white">
              <h1 className="text-5xl font-bold">Post now!</h1>
              <p className="py-6">
                Post a simple story, blog, or a life event to share with the
                world!
              </p>
            </div>
            {/* form */}
            <div className="card bg-transparent glass w-full max-w-sm shrink-0 shadow-2xl group">
              <form onSubmit={handlePostStory} className="card-body">
                <fieldset className="fieldset">
                  {/* title */}
                  <label className="label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="input w-full"
                    placeholder="Title of your story..."
                  />
                  {/* story */}
                  <label className="label">Story</label>
                  {/* <input
                    type="text"
                    name="details"
                    className="input"
                    placeholder="Details of your story..."
                  /> */}
                  <textarea
                    name="details"
                    className="textarea w-full"
                    placeholder="Details of your story..."
                    // rows={6}
                  />
                  {/* submit button */}
                  <button
                    id="postStoryButton"
                    type="submit"
                    className="btn btn-warning w-full mt-4 group-hover:btn-neutral group-hover:scale-105 tracking-widest capitalize"
                  >
                    Post
                  </button>
                </fieldset>
              </form>
              <button
                className="btn btn-accent"
                onClick={() => {
                  fillAndSubmitForm();
                  // handlePostStory;
                }}
              >
                Do some automation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormFilling;
