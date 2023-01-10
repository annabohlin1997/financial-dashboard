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
    <div>
      <p>Food:</p>
      <p>{Math.floor(foodRatio * 100)}%</p>
      <div style={{ backgroundColor: "#F00", width: `${foodRatio * 100}%` }}>
        _
      </div>
      <p>Shopping:</p>
      <p>{Math.floor(shoppingRatio * 100)}%</p>
      <div
        style={{ backgroundColor: "#F00", width: `${shoppingRatio * 100}%` }}
      >
        _
      </div>
      <p>Transportation:</p>
      <p>{Math.floor(transportationRatio * 100)}%</p>
      <div
        style={{
          backgroundColor: "#F00",
          width: `${transportationRatio * 100}%`,
        }}
      >
        _
      </div>
    </div>
  );
};

export default SpendingStatistics;
