import { useEffect, useRef, useState } from "react";
import { clamp, smootherstep } from "../helpers/mathHelpers";
import "../styles/SpendingStatistics.css";

const animate = ({ animTimeMs, animations, refCallBack }) => {
  const animStartTime = Date.now();

  const animFrame = () => {
    const animProgress = clamp((Date.now() - animStartTime) / animTimeMs, 0, 1);

    refCallBack(
      requestAnimationFrame(() => {
        for (let animation of animations) {
          animation.animCallBack(
            smootherstep(animProgress, animation.animStartV, animation.animEndV)
          );
        }

        if (animProgress < 1) {
          animFrame();
        }
      })
    );
  };

  animFrame();
};

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
      animTimeMs: 800,
      refCallBack: (ref) => (requestAnimationFrameRef.current = ref),
      animations: [
        {
          animStartV: foodRatio,
          animEndV: newFoodRatio,
          animCallBack: setFoodRatio,
        },
        {
          animStartV: shoppingRatio,
          animEndV: newShoppingRatio,
          animCallBack: setShoppingRatio,
        },
        {
          animStartV: transportationRatio,
          animEndV: newTransportationRatio,
          animCallBack: setTransportationRatio,
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
