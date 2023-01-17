import { useEffect, useRef, useState } from "react";
import animate from "../helpers/animate";
import "../styles/SpendingStatistics.css";

const SpendingStatistics = ({ transactions }) => {
  const [foodRatio, setFoodRatio] = useState(0);
  const [shoppingRatio, setShoppingRatio] = useState(0);
  const [transportationRatio, setTransportationRatio] = useState(0);

  const requestAnimationFrameRef = useRef();

  useEffect(() => {
    const sumOfExpenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const newFoodRatio =
      transactions
        .filter((transaction) => transaction.category === "food")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    const newShoppingRatio =
      transactions
        .filter((transaction) => transaction.category === "shopping")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    const newTransportationRatio =
      transactions
        .filter((transaction) => transaction.category === "transportation")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    cancelAnimationFrame(requestAnimationFrameRef.current);
    animate({
      refCallBack: (ref) => (requestAnimationFrameRef.current = ref),
      animations: [
        {
          timeMs: 800,
          delayMs: 0,
          startValue: foodRatio,
          endValue: newFoodRatio,
          callBack: setFoodRatio,
        },
        {
          timeMs: 1000,
          delayMs: 0,
          startValue: shoppingRatio,
          endValue: newShoppingRatio,
          callBack: setShoppingRatio,
        },
        {
          timeMs: 1200,
          delayMs: 0,
          startValue: transportationRatio,
          endValue: newTransportationRatio,
          callBack: setTransportationRatio,
        },
      ],
    });

    return () => cancelAnimationFrame(requestAnimationFrameRef.current);
  }, [transactions]);

  return (
    <div className="statistics-wrapper">
      <img className="statistics-green" src="food-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar-bg">
          <div
            className="statistics-bar-fill"
            style={{
              backgroundColor: "var(--color-green)",
              width: `${foodRatio * 100}%`,
            }}
          />
        </div>
        <p>Food</p>
      </div>
      <p className="statistics-percentage">{Math.floor(foodRatio * 100)}%</p>
      <img className="statistics-orange" src="shopping-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar-bg">
          <div
            className="statistics-bar-fill"
            style={{
              backgroundColor: "var(--color-orange)",
              width: `${shoppingRatio * 100}%`,
            }}
          />
        </div>
        <p>Shopping</p>
      </div>
      <p className="statistics-percentage">
        {Math.floor(shoppingRatio * 100)}%
      </p>
      <img className="statistics-blue" src="travel-colored.svg" alt="" />
      <div className="statistics-main">
        <div className="statistics-bar-bg">
          <div
            className="statistics-bar-fill"
            style={{
              backgroundColor: "var(--color-blue)",
              width: `${transportationRatio * 100}%`,
            }}
          />
        </div>
        <p>Transportation</p>
      </div>
      <p className="statistics-percentage">
        {Math.floor(transportationRatio * 100)}%
      </p>
    </div>
  );
};

export default SpendingStatistics;
