import { useEffect, useRef } from "react";
import "../styles/Transactions.css";

const icons = {
  food: "food-gray",
  shopping: "shopping-gray",
  transportation: "travel-gray",
  income: "salary",
};

const Transactions = ({ transactions }) => {
  const prevTransactions = useRef(transactions);

  useEffect(() => {
    prevTransactions.current = transactions;
  });

  const newItemsTotalCount =
    transactions.length - prevTransactions.current.length;

  let newItemsCounter = 0;

  return (
    <div>
      <ul>
        {transactions.map((transaction, i) => {
          const className = ["transactions-list"];

          let animationDelay = 0;
          if (i < newItemsTotalCount) {
            className.push("transactions-list--new");
            animationDelay = (newItemsTotalCount - newItemsCounter) * 30;
            newItemsCounter++;
          }

          return (
            <li
              className={className.join(" ").trim()}
              style={{ animationDelay: `${animationDelay}ms` }}
              key={transaction.id}
            >
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
          );
        })}
      </ul>
    </div>
  );
};

export default Transactions;
