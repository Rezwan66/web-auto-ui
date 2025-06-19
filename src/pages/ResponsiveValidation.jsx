import { useBearStore } from '../hooks/Zustand';

const ResponsiveValidation = () => {
  const bears = useBearStore(state => state.bears);
  return (
    <>
      <div className="text-white">
        <h2> HELLO I Am ResponsiveValidation </h2>
        <h3>{bears} bears around here ...</h3>
      </div>
    </>
  );
};
export default ResponsiveValidation;
