// Expenses.js
// computation of expenses objects

import _ from 'underscore';
import moment from 'moment';

let Expenses = {};

// Returns an array of expenses
// allExpenses: an array of expenses to be sorted out
// dateFormat: string format of date, used: 'DD MMMM YYYY, dddd' for day, 'MMMM YYYY' for month
// date: if specified, it is the date that will be used
Expenses.getExpenses = (allExpenses, dateFormat, date) => {
  let dateToUse = (date) ? new Date(date) : new Date();
  allExpenses = _.sortBy(allExpenses, 'date').reverse();
  var current = moment(dateToUse).format(dateFormat);
  let expenses = [];
  for (let i = 0; i < allExpenses.length; i++) {
    var date = moment(allExpenses[i].date).format(dateFormat);
    if (date == current) {
      expenses.push(allExpenses[i]);
    } else {
      break;
    }
  }
  return expenses;
};

// Returns an array of title-detail objects
// title = category (could be an expense's category or date)
// detail = sum of expenses in a category
Expenses.sumUpByCategory = (expenses) => {
  let expensesCategory = [];
  let categories = _.unique(_.pluck(expenses, 'category')).sort();
  for (let i = 0; i < categories.length; i++) {
    let items = _.where(expenses, {category: categories[i]});
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += parseFloat(items[i].amount);
    }
    let e = {
      title: categories[i],
      detail: total.toFixed(2)
    }
    expensesCategory.push(e);
  }
  return expensesCategory;
}

// Returns the total amount of an array of expenses
Expenses.computeAmount = (expenses) => {
  let amount = 0;
  for (let i = 0; i < expenses.length; i++) {
    amount += parseFloat(expenses[i].amount);
  }
  return amount;
}

module.exports = Expenses;
