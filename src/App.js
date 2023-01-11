import { useState } from "react";
import "./App.css";
import AddGoal from "./components/AddGoal";
import Cards from "./components/Cards";
import GoalsWrapper from "./components/GoalsWrapper";
import ModalWrapper from "./components/ModalWrapper";
import ModuleWrapper from "./components/ModuleWrapper";
import SpendingStatistics from "./components/SpendingStatistics";
import Transactions from "./components/Transactions";

// ——————
// Dummy data:
const dummyTransactions = [
  {
    date: "2023-01-01",
    name: "Uber",
    amount: -32.2,
    category: "transportation",
  },
  {
    date: "2023-01-01",
    name: "Max",
    amount: -16.23,
    category: "food",
  },
  {
    date: "2022-12-30",
    name: "Systembolaget",
    amount: -65.96,
    category: "food",
  },
  {
    date: "2022-12-29",
    name: "H&M",
    amount: -112.14,
    category: "shopping",
  },

  {
    date: "2022-12-25",
    name: "Salary",
    amount: 2000,
    category: "income",
  },
];

const dummyGoals = [
  {
    date: "2023-04-01",
    name: "MacBook Pro",
    amount: 2500,
  },
  {
    date: "2023-06-02",
    name: "Taormina",
    amount: 5000,
  },
  {
    date: "2025-01-01",
    name: "House",
    amount: 2000000,
  },
];
// ——————

function App() {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [goals, setGoals] = useState(dummyGoals);
  const [addGoalsVisible, setAddGoalsVisible] = useState(false);

  const showAddGoals = () => setAddGoalsVisible(true);
  const hideAddGoals = () => setAddGoalsVisible(false);

  const addGoal = ({ name, date, amount }) => {
    setGoals([
      ...goals,
      {
        name,
        date,
        amount,
      },
    ]);
  };

  const addRandomTransactions = () => {
    //settings
    const minNumberOfTransactions = 1;
    const maxNumberOfTransactions = 8;
    const minAmount = 0.45;
    const maxAmount = 300;

    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const spendingCategories = ["transportation", "food", "shopping"];

    const spendingNames = {
      transportation: ["Uber", "SL"],
      food: ["Max", "Roots", "Hemköp"],
      shopping: ["H&M", "Addnature"],
    };

    let lastDate = new Date(transactions[0].date);

    const numberOfTransactions = Math.floor(
      Math.random() * (maxNumberOfTransactions - minNumberOfTransactions) +
        minNumberOfTransactions
    );

    const newTransactions = [];

    //loop!
    for (let i = 0; i < numberOfTransactions; i++) {
      lastDate.setDate(lastDate.getDate() + 1);

      const category = randomItem(spendingCategories);
      const name = randomItem(spendingNames[category]);
      const amount = -Math.abs(
        Math.round(
          (Math.random() * (maxAmount - minAmount) + minAmount) * 100
        ) / 100
      );
      const date = `${lastDate.getFullYear()}-${lastDate.getMonth()}-${lastDate.getDate()}`;

      newTransactions.unshift({ name, category, amount, date });
    }

    setTransactions([...newTransactions, ...transactions]);
  };

  return (
    <>
      <div className="App">
        <img src="logo.svg" alt="Cloudcash cloud logo"></img>
        <div className="columns">
          <div>
            <ModuleWrapper title="Cards">
              <Cards transactions={transactions} />
            </ModuleWrapper>
            <ModuleWrapper
              title="Transactions"
              titleChildren={
                <button onClick={addRandomTransactions}>"Sync"</button>
              }
            >
              <Transactions transactions={transactions} />
            </ModuleWrapper>
          </div>
          <div>
            <ModuleWrapper
              title="Goals"
              showBackground={false}
              titleChildren={<button onClick={showAddGoals}>Add Goal</button>}
            >
              <GoalsWrapper goals={goals} />
            </ModuleWrapper>
            <ModuleWrapper title="Spending Statistics" showBackground={false}>
              <SpendingStatistics transactions={transactions} />
            </ModuleWrapper>
          </div>{" "}
        </div>

        <h1>DEBUG</h1>
        <button
          onClick={() =>
            setTransactions([
              ...transactions,
              {
                date: "2023-01-01",
                name: "Uber",
                amount: -23.2,
                category: "transportation",
              },
            ])
          }
        >
          Add transaction
        </button>
      </div>
      {addGoalsVisible && (
        <ModalWrapper closeCb={hideAddGoals}>
          <ModuleWrapper title="Add goal (temp)">
            <AddGoal addGoalCb={addGoal} closeCb={hideAddGoals} />
          </ModuleWrapper>
        </ModalWrapper>
      )}
    </>
  );
}

export default App;
