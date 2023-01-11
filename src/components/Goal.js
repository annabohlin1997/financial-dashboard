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
      <div className="cardEnd">
      <div className="goalIcon" >
      <img src={goal.icon + ".svg"} alt="" /></div>
      <div className="goalName">
        <p>{goal.name}</p>
      </div>
    </div>
    </div>
  );
};

export default Goal;
