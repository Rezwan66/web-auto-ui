const CodeViewer = ({ codeText }) => {
  return (
    <div>
      <h3 className="font-bold text-lg"> Code Generated </h3>
      <div className="mockup-code bg-primary text-primary-content w-full">
        <pre>
          <code>{codeText}</code>
        </pre>
      </div>
    </div>
  );
};
export default CodeViewer;
