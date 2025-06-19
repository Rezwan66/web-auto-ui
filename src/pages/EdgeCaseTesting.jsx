import { useBearStore } from '../hooks/Zustand';

const EdgeCaseTesting = () => {
  const increasePopulation = useBearStore(state => state.increasePopulation);
  const removeAllBears = useBearStore(state => state.removeAllBears);
  return (
    <>
      <div className="text-white">
        <h2> HELLO I Am EdgeCaseTesting </h2>
        <button className="btn btn-accent" onClick={increasePopulation}>
          One Up
        </button>
        <button className="btn btn-accent ml-2" onClick={removeAllBears}>
          Clear
        </button>
      </div>
    </>
  );
};
export default EdgeCaseTesting;
