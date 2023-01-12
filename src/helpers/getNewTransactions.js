const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getNewTransactions = async (transactions) => {
  //settings
  const minNumberOfTransactions = 1;
  const maxNumberOfTransactions = 3;
  const minSpendAmount = 0.45;
  const maxSpendAmount = 120;
  const minSalaryAmount = 1900;
  const maxSalaryAmount = 2100;

  const spendingCategories = ["transportation", "food", "shopping"];

  const spendingNames = {
    transportation: ["Uber", "SL", "Voi", "Bolt"],
    food: ["Max", "Roots", "Hemköp", "Foodora", "Hemmakväll", "Espresso House"],
    shopping: ["H&M", "Addnature", "Zalando", "Asos", "Elgiganten", "Clas Ohlson", "Ikea", "BikBok", "Akademibokhandeln", "MatHem", "Ica MAXI", "Gina Tricot", "Dressman", "Nike", "Adidas", "Gymshark", "Scorett", "Lindex", "Åhlens", "Arket"], 
  };

  let lastDate = new Date(transactions[0].date);
  const lastId = transactions[0].id;

  const monthsWithSalary = transactions
    .filter((transaction) => transaction.name === "Salary")
    .map((transaction) => {
      const date = new Date(transaction.date);
      return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
        2,
        "0"
      )}`;
    });

  const numberOfTransactions = Math.floor(
    randomInRange(minNumberOfTransactions, maxNumberOfTransactions)
  );

  const newTransactions = [];

  //loop to create the new transactions
  for (let i = 0; i < numberOfTransactions; i++) {
    lastDate.setDate(lastDate.getDate() + Math.floor(Math.random() * 2));

    let category, name, amount;

    if (
      lastDate.getDate() >= 25 &&
      !monthsWithSalary.includes(
        `${lastDate.getFullYear()}-${`${lastDate.getMonth() + 1}`.padStart(
          2,
          "0"
        )}`
      )
    ) {
      lastDate.setDate(25);
      monthsWithSalary.unshift(
        `${lastDate.getFullYear()}-${`${lastDate.getMonth() + 1}`.padStart(
          2,
          "0"
        )}`
      );

      category = "income";
      name = "Salary";
      amount = Math.abs(
        Math.round(randomInRange(minSalaryAmount, maxSalaryAmount) * 100) / 100
      );
    } else {
      category = randomItem(spendingCategories);
      name = randomItem(spendingNames[category]);
      amount = -Math.abs(
        Math.round(randomInRange(minSpendAmount, maxSpendAmount) * 100) / 100
      );
    }

    const date = `${lastDate.getFullYear()}-${`${
      lastDate.getMonth() + 1
    }`.padStart(2, "0")}-${`${lastDate.getDate()}`.padStart(2, "0")}`;

    newTransactions.unshift({
      id: lastId + i + 1,
      name,
      category,
      amount,
      date,
    });
  }

  await asyncTimeout(Math.floor(randomInRange(500, 1500)));
  return newTransactions;
};

export { getNewTransactions };
