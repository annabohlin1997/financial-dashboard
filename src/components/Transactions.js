import "../styles/Transactions.css";

const Transactions = ({ transactions }) => {
  return (
    <div>
      <ul>
        {transactions.map((transaction, i) => (
          <li className="transactions-list" key={i}>
            <img className="transactions-icon" src={transaction.icon + ".svg"} alt="" /> 
            <p>{transaction.name}</p> 
            <p className="transactions-light-gray">{transaction.date}</p> 
            <p className="transactions-light-gray">{transaction.category}</p> 
            <p className="transactions-amount">{transaction.amount > 0 ? `$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
