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

//Scripts / Helpers
import { getNewTransactions } from "./helpers/getNewTransactions";
import * as dummyData from "./helpers/dummyData";

function App() {
  const [transactions, setTransactions] = useState(dummyData.transactions);
  const [goals, setGoals] = useState(dummyData.goals);

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [addGoalsVisible, setAddGoalsVisible] = useState(false);

  const addNewTransactions = async () => {
    setIsLoadingTransactions(true);
    const newTransactions = await getNewTransactions(transactions);
    setTransactions([...newTransactions, ...transactions]);
    setIsLoadingTransactions(false);
  };

  const showAddGoals = () => setAddGoalsVisible(true);
  const hideAddGoals = () => setAddGoalsVisible(false);

  const addGoal = ({ name, date, amount }) => {
    setGoals([...goals, { name, date, amount }]);
  };

  return (
    <>
      <div className="App">
        <img className="logo" src="logo.svg" alt="Cloudcash cloud logo"></img>
        <div className="columns">
          <div>
            <ModuleWrapper title="Cards">
              <Cards transactions={transactions} />
            </ModuleWrapper>
            <ModuleWrapper
              title="Transactions"
              titleChildren={
                <>
                  <button
                    className={`module-wrapper-header-btn ${
                      isLoadingTransactions
                        ? "module-wrapper-header-btn--spin"
                        : ""
                    }`}
                    onClick={addNewTransactions}
                    disabled={isLoadingTransactions}
                  >
                    <img src="sync.svg" />
                  </button>
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
                <button
                  className="module-wrapper-header-btn"
                  onClick={showAddGoals}
                >
                  <img src="plus-circle.svg" />
                </button>
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
