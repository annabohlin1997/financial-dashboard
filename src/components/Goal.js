import "../styles/Goal.css";

const Goal = ({ goal }) => {
  return (
    <div className="goal card-look">
      <p>{goal.date}</p>
      <p>{goal.name}</p>
      <p>{goal.amount}</p>
    </div>
  );
};

export default Goal;
