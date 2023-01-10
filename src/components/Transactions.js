const Transactions = ({ transactions }) => {
  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li>
            {transaction.name} {transaction.date} {transaction.category} $
            {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
