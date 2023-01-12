import { useState } from "react";
import "./App.css";

//Components
import AddGoal from "./components/AddGoal";
import Cards from "./components/Cards";
import GoalsWrapper from "./components/GoalsWrapper";
import ModalWrapper from "./components/ModalWrapper";
import ModuleWrapper from "./components/ModuleWrapper";
import SpendingStatistics from "./components/SpendingStatistics";
import Transactions from "./components/Transactions";

//Scripts
import { getNewTransactions } from "./helpers/getNewTransactions";

// ——————
// Dummy data:
const dummyTransactions = [
  {
    id: 5,
    date: "2023-01-01",
    name: "Uber",
    amount: -32.2,
    category: "transportation",
  },
  {
    id: 4,
    date: "2023-01-01",
    name: "Max",
    amount: -16.23,
    category: "food",
  },
  {
    id: 3,
    date: "2022-12-30",
    name: "Systembolaget",
    amount: -65.96,
    category: "food",
  },
  {
    id: 2,
    date: "2022-12-29",
    name: "H&M",
    amount: -112.14,
    category: "shopping",
  },

  {
    id: 1,
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
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [goals, setGoals] = useState(dummyGoals);
  const [addGoalsVisible, setAddGoalsVisible] = useState(false);

  const addNewTransactions = async () => {
    setLoadingTransactions(true);
    const newTransactions = await getNewTransactions(transactions);
    setTransactions([...newTransactions, ...transactions]);
    setLoadingTransactions(false);
  };

  const showAddGoals = () => setAddGoalsVisible(true);
  const hideAddGoals = () => setAddGoalsVisible(false);

  const addGoal = ({ name, date, amount }) => {
    setGoals([...goals, { name, date, amount }]);
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
                <>
                  <img
                    src="sync.svg"
                    onClick={addNewTransactions}
                    disabled={loadingTransactions}
                  />

                  {loadingTransactions && (
                    <p>" — LOADING (this is temp. will be a spinner)"</p>
                  )}
                </>
              }
            >
              <Transactions transactions={transactions} />
            </ModuleWrapper>
          </div>
          <div>
            <ModuleWrapper
              title="Goals"
              showBackground={false}
              titleChildren={
                <img
                  className="addGoal"
                  src="plus-circle.svg"
                  onClick={showAddGoals}
                />
              }
            >
              <GoalsWrapper goals={goals} />
            </ModuleWrapper>
            <ModuleWrapper title="Spending Statistics" showBackground={false}>
              <SpendingStatistics transactions={transactions} />
            </ModuleWrapper>
          </div>{" "}
        </div>
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
