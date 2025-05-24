const FormFilling = () => {
  const handlePostStory = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const details = e.target.details.value;
    const postData = {
      title,
      details,
    };
    console.log('submitted', postData);
  };
  return (
    <>
      <div>
        {/* <h2> HELLO I Am FormFilling </h2> */}
        <div className="hero bg-base-200 min-h-screen relative">
          {/* Background with opacity control */}
          <div
            className="absolute bg-cover bg-center inset-0 opacity-85"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            }}
          ></div>
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
                    className="input"
                    placeholder="Title of your story..."
                  />
                  <label className="label">Story</label>
                  <input
                    type="text"
                    name="details"
                    className="input"
                    placeholder="Details of your story..."
                  />

                  <button
                    type="submit"
                    className="btn btn-warning mt-4 group-hover:btn-neutral group-hover:scale-105"
                  >
                    Post
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormFilling;
