import { useState } from "react";
import "./App.css";
import CardWrapper from "./components/CardWrapper";

// ——————
// Dummy data:
const dummyTransactions = [
  {
    date: "2022-12-25",
    name: "Salary",
    amount: 2000,
    category: "income",
  },
  {
    date: "2022-12-29",
    name: "H&M",
    amount: 112.14,
    category: "shopping",
  },
  {
    date: "2022-12-30",
    name: "Systembolaget",
    amount: 95.96,
    category: "food",
  },
  {
    date: "2023-01-01",
    name: "Max",
    amount: 16.23,
    category: "food",
  },
  {
    date: "2023-01-01",
    name: "Uber",
    amount: 23.2,
    category: "transport",
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

  return (
    <div className="App">
      <CardWrapper />
    </div>
  );
}

export default App;
