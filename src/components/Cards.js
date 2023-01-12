import { useEffect, useRef, useState } from "react";
import { clamp, smootherstep } from "../helpers/mathHelpers";
import "../styles/Cards.css";
import Button from "./Button";

const Cards = ({ transactions }) => {
  const [cardIsActive, setCardIsActive] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const requestAnimationFrameRef = useRef();
  const animStartTime = useRef();
  const animTimeMs = 800;

  const animCurrentBalanceStart = useRef();
  const animCurrentBalanceEnd = useRef();
  const animIncomeStart = useRef();
  const animIncomeEnd = useRef();
  const animExpensesStart = useRef();
  const animExpensesEnd = useRef();

  useEffect(() => {
    cancelAnimationFrame(requestAnimationFrameRef.current);

    //animation starts here
    animStartTime.current = Date.now();

    animCurrentBalanceStart.current = currentBalance;
    animCurrentBalanceEnd.current = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    animIncomeStart.current = income;
    animIncomeEnd.current = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    animExpensesStart.current = expenses;
    animExpensesEnd.current = Math.abs(
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    requestAnimationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestAnimationFrameRef.current);
  }, [transactions]);

  const animate = () => {
    const animProgress = clamp(
      (Date.now() - animStartTime.current) / animTimeMs,
      0,
      1
    );

    setCurrentBalance(
      smootherstep(
        animProgress,
        animCurrentBalanceStart.current,
        animCurrentBalanceEnd.current
      )
    );

    setIncome(
      smootherstep(animProgress, animIncomeStart.current, animIncomeEnd.current)
    );

    setExpenses(
      smootherstep(
        animProgress,
        animExpensesStart.current,
        animExpensesEnd.current
      )
    );

    if (animProgress < 1) {
      requestAnimationFrameRef.current = requestAnimationFrame(animate);
    }
  };

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
