import "../styles/SpendingStatistics.css";

const SpendingStatistics = ({ transactions }) => {
  const sumOfExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const foodRatio =
    transactions
      .filter((transaction) => transaction.category === "food")
      .reduce((sum, transaction) => sum + transaction.amount, 0) /
    sumOfExpenses;

  const shoppingRatio =
    transactions
      .filter((transaction) => transaction.category === "shopping")
      .reduce((sum, transaction) => sum + transaction.amount, 0) /
    sumOfExpenses;

  const transportationRatio =
    transactions
      .filter((transaction) => transaction.category === "transportation")
      .reduce((sum, transaction) => sum + transaction.amount, 0) /
    sumOfExpenses;

  return (
    <div className="statistics-wrapper">
      <img className="statistics-green" src="food-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar" style={{ backgroundColor: "#22a447", width: `${foodRatio * 100}%` }}>
        .
        </div>
        <p>Food</p>
      </div>
      <p className="statistics-percentage">{Math.floor(foodRatio * 100)}%</p>
      <img className="statistics-orange" src="shopping-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar" style={{ backgroundColor: "#f8964c", width: `${shoppingRatio * 100}%` }}>
          .
        </div>
        <p>Shopping</p>
      </div>
      <p className="statistics-percentage">{Math.floor(shoppingRatio * 100)}%</p>
      <img className="statistics-blue" src="travel-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar" style={{ backgroundColor: "#70a6e8", width: `${transportationRatio * 100}%`,}}>
          .
        </div>
        <p>Transportation</p>
      </div>
      <p className="statistics-percentage">{Math.floor(transportationRatio * 100)}%</p>
    </div>
  );
};

export default SpendingStatistics;
