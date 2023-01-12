import { useEffect, useRef, useState } from "react";
import { clamp, smootherstep } from "../helpers/mathHelpers";
import "../styles/SpendingStatistics.css";

const SpendingStatistics = ({ transactions }) => {
  const [foodRatio, setFoodRatio] = useState(0);
  const [shoppingRatio, setShoppingRatio] = useState(0);
  const [transportationRatio, setTransportationRatio] = useState(0);

  const requestAnimationFrameRef = useRef();
  const animStartTime = useRef();
  const animTimeMs = 800;

  const animFoodRatioStart = useRef();
  const animFoodRatioEnd = useRef();
  const animShoppingRatioStart = useRef();
  const animShoppingRatioEnd = useRef();
  const animTransportationRatioStart = useRef();
  const animTransportationRatioEnd = useRef();

  useEffect(() => {
    cancelAnimationFrame(requestAnimationFrameRef.current);

    //animation starts here
    animStartTime.current = Date.now();

    const sumOfExpenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    animFoodRatioStart.current = foodRatio;
    animFoodRatioEnd.current =
      transactions
        .filter((transaction) => transaction.category === "food")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    animShoppingRatioStart.current = shoppingRatio;
    animShoppingRatioEnd.current =
      transactions
        .filter((transaction) => transaction.category === "shopping")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    animTransportationRatioStart.current = transportationRatio;
    animTransportationRatioEnd.current =
      transactions
        .filter((transaction) => transaction.category === "transportation")
        .reduce((sum, transaction) => sum + transaction.amount, 0) /
      sumOfExpenses;

    requestAnimationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestAnimationFrameRef.current);
  }, [transactions]);

  const animate = () => {
    const animProgress = clamp(
      (Date.now() - animStartTime.current) / animTimeMs,
      0,
      1
    );
    console.log(animProgress);

    setFoodRatio(
      smootherstep(
        animProgress,
        animFoodRatioStart.current,
        animFoodRatioEnd.current
      )
    );

    setShoppingRatio(
      smootherstep(
        animProgress,
        animShoppingRatioStart.current,
        animShoppingRatioEnd.current
      )
    );

    setTransportationRatio(
      smootherstep(
        animProgress,
        animTransportationRatioStart.current,
        animTransportationRatioEnd.current
      )
    );

    if (animProgress < 1) {
      requestAnimationFrameRef.current = requestAnimationFrame(animate);
    }
  };

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
