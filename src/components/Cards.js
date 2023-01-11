import { useEffect, useState } from "react";
import "../styles/Cards.css";

const Cards = ({ transactions }) => {
  const [cardIsActive, setCardIsActive] = useState(true);
  // const [cardIsActiveUI, setCardIsActiveUI] = useState(true);

  // useEffect(() => {
  //   setCardIsActiveUI(cardIsActive);
  // }, [cardIsActive]);

  const currentBalance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = Math.abs(
    transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );

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
            <button
              className="cards-card-card-btn"
              onClick={() => setCardIsActive(true)}
            >
              Activate card
            </button>
          )}
        </div>
      </div>
      <div className="cards-statistics-container">
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-primary)" }}
          >
            $&nbsp;
            <span className="cards-statistics-number--big">
              {Math.floor(currentBalance)}
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
          <input
            type="checkbox"
            id="deactivateCardCheckBox"
            checked={!cardIsActive}
            onChange={(e) => setCardIsActive(!e.target.checked)}
          />
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
