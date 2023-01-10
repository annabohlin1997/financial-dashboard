import "../styles/Goal.css";

const Goal = ({ goal }) => {
  return (
    <div className="goal card-look">
      <p>{goal.date}</p>
      <p>
        <strong>{goal.name}</strong>
      </p>
      <p>${goal.amount}</p>
    </div>
  );
};

export default Goal;
