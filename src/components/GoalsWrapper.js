import "../styles/GoalsWrapper.css";

import Goal from "./Goal";

const GoalsWrapper = ({ goals }) => {
  return (
    <div className="goals-wrapper">
      {goals.map((goal, i) => (
        <Goal key={i} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsWrapper;
