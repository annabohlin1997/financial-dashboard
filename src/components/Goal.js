import "../styles/Goal.css";

const Goal = ({ goal }) => {
  return (
    <div className="goal card-look">
      <div className="cardTop">
        <div className="goalAmount">
          <strong><p>${goal.amount}</p></strong>
        </div>
        <div className="goalDate">
          <p>{goal.date}</p>
        </div>
      </div>
      <p>
      <div className="goalName">{goal.name}</div>
      </p>
    </div>
  );
};

export default Goal;
