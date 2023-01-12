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
        <div className="add-goal-form-input-with-label-wrapper">
          <input
            id="name"
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="add-goal-form-label" htmlFor="name">
            Name
          </label>
        </div>
        <div className="add-goal-form-input-with-label-wrapper">
          <input
            id="date"
            type="date"
            required
            placeholder="2022-01-01"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="add-goal-form-label" htmlFor="date">
            Date
          </label>
        </div>
        <div className="add-goal-form-input-with-label-wrapper">
          <input
            id="amount"
            type="number"
            step="10"
            required
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label className="add-goal-form-label" htmlFor="amount">
            Amount
          </label>
        </div>
        <div className="add-goal-form-input-buttons-wrapper">
          <Button label="Cancel" variant="secondary" onClick={onClose} />
          <Button label="Save Goal" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddGoal;
