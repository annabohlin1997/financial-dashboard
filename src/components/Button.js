import "../styles/Button.css";

const Button = ({ onClick, label, className, type, variant }) => {
  const variantClass = variant === "secondary" ? "button--secondary" : "";
  className = `button ${variantClass} ${className}`;

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

Button.defaultProps = {
  type: "default",
  variant: "primary",
};

export default Button;
