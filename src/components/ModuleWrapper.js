import "../styles/ModuleWrapper.css";

const ModuleWrapper = ({ title, showBackground, children }) => {
  const className = `moduleWrapper ${showBackground && "card-look"}`;

  return (
    <div className={className}>
      <h2>{title}</h2>
      <p>Show background: {showBackground.toString()}</p>
      {children}
    </div>
  );
};

ModuleWrapper.defaultProps = {
  showBackground: true,
};

export default ModuleWrapper;
