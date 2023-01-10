const Module = ({ title, showBackground, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Show background: {showBackground.toString()}</p>
      {children}
    </div>
  );
};

Module.defaultProps = {
  showBackground: true,
};

export default Module;
