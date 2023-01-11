import { useState } from "react";
import "../styles/AddGoal.css";

const AddGoal = ({ addGoalCb }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addGoalCb({ name, date, amount });

    setName("");
    setDate("");
    setAmount("");
  };

  return (
    <div className="add-goal">
      <form className="add-goal-form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input type="submit" value="Save Goal" />
      </form>
    </div>
  );
};

export default AddGoal;
