import { useEffect, useRef, useState } from "react";
import animate from "../helpers/animate";
import "../styles/Cards.css";
import Button from "./Button";

const Cards = ({ transactions, cardIsActive, setCardIsActive }) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const requestAnimationFrameRef = useRef();

  useEffect(() => {
    const newCurrentBalance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const newIncome = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const newExpenses = Math.abs(
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    animate({
      refCallBack: (ref) => (requestAnimationFrameRef.current = ref),
      animations: [
        {
          timeMs: 800,
          delayMs: 0,
          startValue: currentBalance,
          endValue: newCurrentBalance,
          callBack: setCurrentBalance,
        },
        {
          timeMs: 1000,
          delayMs: 0,
          startValue: income,
          endValue: newIncome,
          callBack: setIncome,
        },
        {
          timeMs: 1200,
          delayMs: 0,
          startValue: expenses,
          endValue: newExpenses,
          callBack: setExpenses,
        },
      ],
    });

    return () => cancelAnimationFrame(requestAnimationFrameRef.current);
  }, [transactions]);

  return (
    <div className="cards">
      <div className="cards-card-container">
        <div className="cards-card-card-wrapper">
          <img
            className={`cards-card-card ${
              cardIsActive ? "" : "cards-card-card--inactive"
            }`.trim()}
            src="credit-card.svg"
            alt=""
          />
          {!cardIsActive && (
            <Button
              onClick={() => setCardIsActive(true)}
              label="Activate card"
              className="cards-card-card-btn"
            ></Button>
          )}
        </div>
      </div>
      <div className="cards-statistics-container">
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{
              color:
                currentBalance > 0
                  ? "var(--color-ui-primary)"
                  : "var(--color-ui-warning)",
            }}
          >
            {currentBalance < 0 && "-"}$&nbsp;
            <span className="cards-statistics-number--big">
              {Math.abs(Math.floor(currentBalance))}
            </span>
          </p>
          <p className="cards-statistics-label">Current balance</p>
        </div>
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-success)" }}
          >
            $&nbsp;{Math.floor(income)}
          </p>
          <p className="cards-statistics-label">Income</p>
        </div>
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-warning)" }}
          >
            $&nbsp;{Math.floor(expenses)}
          </p>
          <p className="cards-statistics-label">Expenses</p>
        </div>

        <div className="cards-statistics-readout">
          <label className="cards-toggle-switch">
            <input
              type="checkbox"
              id="deactivateCardCheckBox"
              checked={!cardIsActive}
              onChange={(e) => setCardIsActive(!e.target.checked)}
            />
            <span className="cards-toggle-slider"></span>
          </label>
          <label
            htmlFor="deactivateCardCheckBox"
            className="cards-statistics-label"
          >
            Deactivate card
          </label>
        </div>
      </div>
    </div>
  );
};

export default Cards;
