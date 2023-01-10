import "../styles/ModuleWrapper.css";

const ModuleWrapper = ({ title, showBackground, children }) => {
  const className = `module-wrapper ${showBackground && "card-look"}`;

  return (
    <div className={className}>
      <h2 className="module-wrapper-title">{title}</h2>
      {children}
    </div>
  );
};

ModuleWrapper.defaultProps = {
  showBackground: true,
};

export default ModuleWrapper;
