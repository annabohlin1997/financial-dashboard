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
    icon: "travel-gray",
  },
  {
    date: "2023-01-01",
    name: "Max",
    amount: -16.23,
    category: "food",
    icon: "food-gray",
  },
  {
    date: "2022-12-30",
    name: "Systembolaget",
    amount: -65.96,
    category: "food",
    icon: "food-gray",
  },
  {
    date: "2022-12-29",
    name: "H&M",
    amount: -112.14,
    category: "shopping",
    icon: "shopping-gray",
  },

  {
    date: "2022-12-25",
    name: "Salary",
    amount: 2000,
    category: "income",
    icon: "salary",
  },
];

const dummyGoals = [
  {
    date: "2023-04-01",
    name: "MacBook Pro",
    amount: 2500,
    icon: "goal",
  },
  {
    date: "2023-06-02",
    name: "Taormina",
    amount: 5000,
    icon: "goal",
  },
  {
    date: "2025-01-01",
    name: "House",
    amount: 2000000,
    icon: "goal",
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

  return (
    <>
      <div className="App">
        <img src="logo.svg" alt="Cloudcash cloud logo"></img>
        <div className="columns">
          <div>
            <ModuleWrapper title="Cards">
              <Cards transactions={transactions} />
            </ModuleWrapper>
            <ModuleWrapper title="Transactions">
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
