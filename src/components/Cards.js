import "../styles/Cards.css";

const Cards = ({ transactions }) => {
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
      <div className="cards-card">
        <div
          style={{
            backgroundColor: "skyblue",
            minWidth: "320px",
            minHeight: "202px",
            borderRadius: "26px",
          }}
        ></div>
      </div>
      <div className="cards-statistics">
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-primary)" }}
          >
            ${" "}
            <span className="cards-statistics-number--big">
              {currentBalance}
            </span>
          </p>
          <p className="cards-statistics-label">Current balance</p>
        </div>
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-success)" }}
          >
            $ {income}
          </p>
          <p className="cards-statistics-label">Income</p>
        </div>
        <div className="cards-statistics-readout">
          <p
            className="cards-statistics-number"
            style={{ color: "var(--color-ui-warning)" }}
          >
            $ {expenses}
          </p>
          <p className="cards-statistics-label">Expenses</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
