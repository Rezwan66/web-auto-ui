import toast from 'react-hot-toast';
import { runVisualAutomation } from '../api';

const LoginWorkflow = () => {
  // const handleVisualAutomation = async () => {
  //   const url = 'http://localhost:5173/form';
  //   const actions = [
  //     { type: 'fill', selector: 'input[name=title]', value: 'Test Title' },
  //     {
  //       type: 'fill',
  //       selector: 'textarea[name=details]',
  //       value: 'Test Details',
  //     },
  //     { type: 'click', selector: '#postStoryButton' },
  //   ];
  //   try {
  //     await runVisualAutomation(url, actions);
  //     // alert('Visual automation started—check your browser!');
  //     toast.success('Visual automation started—check your browser!');
  //   } catch {
  //     // alert('Failed to start visual automation.');
  //     toast.error('Failed to start visual automation.');
  //   }
  // };
  return (
    <>
      <div>
        <h2> HELLO I Am LoginWorkflow </h2>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button
                className="btn btn-accent"
                // onClick={handleVisualAutomation}
              >
                Automate
              </button>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginWorkflow;
