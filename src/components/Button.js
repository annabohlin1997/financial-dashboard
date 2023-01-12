import "../styles/Button.css";

const Button = ({ onClick, label, className, type }) => {
  console.log(type);
  className = `button ${className}`;

  let returnComponent;

  if (type === "submit") {
    return <input className={className} type="submit" value={label} />;
  } else {
    //Default
    return (
      <button className={className} onClick={onClick}>
        {label}
      </button>
    );
  }
};

Button.defaultProps = { type: "default" };

export default Button;
