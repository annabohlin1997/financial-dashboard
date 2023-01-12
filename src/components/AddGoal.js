import { useState } from "react";
import "../styles/AddGoal.css";
import Button from "./Button";

const AddGoal = ({ addGoalCb, closeCb }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addGoalCb({ name, date, amount });
    closeCb();
  };

  const onClose = (e) => {
    e.preventDefault();
    closeCb();
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

        <Button type="submit" label="Save Goal" />
        {/* <input type="submit" value="Save Goal" /> */}
        <Button onClick={onClose} label="Cancel" />
      </form>
    </div>
  );
};

export default AddGoal;
