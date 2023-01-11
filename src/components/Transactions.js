import "../styles/Transactions.css";

const Transactions = ({ transactions }) => {
  const icons = {
    food: "food-gray",
    shopping: "shopping-gray",
    transportation: "travel-gray",
    income: "salary",
  };

  return (
    <div>
      <ul>
        {transactions.map((transaction, i) => (
          <li className="transactions-list" key={i}>
            <div className="transactions-icon">
              <img src={icons[transaction.category] + ".svg"} alt="" />
            </div>
            <p>{transaction.name}</p>
            <p className="transactions-light-gray">{transaction.date}</p>
            <p
              className="transactions-light-gray"
              style={{ textTransform: "capitalize" }}
            >
              {transaction.category}
            </p>
            <p className="transactions-amount">
              {transaction.amount > 0
                ? `$${transaction.amount}`
                : `-$${Math.abs(transaction.amount)}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
