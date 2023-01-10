const Cards = ({ transactions }) => {
  const currentBalance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div>
      <p>Current balance:</p>
      <p>${currentBalance}</p>

      <p>Income:</p>
      <p>${income}</p>
      <p>Expenses:</p>
      <p>${expenses}</p>
    </div>
  );
};

export default Cards;
