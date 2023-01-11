import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import GoalsWrapper from "./components/GoalsWrapper";
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

  //Should (maybe?!) live in the goals component
  const [goals, setGoals] = useState(dummyGoals);

  return (
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
          <ModuleWrapper title="Goals" showBackground={false}>
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
      <button
        onClick={() =>
          setGoals([
            ...goals,
            {
              date: "2023-04-01",
              name: "MacBook Pro",
              amount: 2500,
            },
          ])
        }
      >
        Add goal
      </button>
    </div>
  );
}

export default App;
