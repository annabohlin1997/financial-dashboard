const Transactions = ({ transactions }) => {
  return (
    <div>
      <ul>
        {transactions.map((transaction, i) => (
          <li key={i}>
            <img src={transaction.icon + ".svg"} alt="" /> {transaction.name} {transaction.date} {transaction.category} $
            {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
