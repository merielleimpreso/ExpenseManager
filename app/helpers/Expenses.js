import _ from 'underscore';
import moment from 'moment';

let Expenses = {};

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

Expenses.computeAmount = (expenses) => {
  let amount = 0;
  for (let i = 0; i < expenses.length; i++) {
    amount += parseFloat(expenses[i].amount);
  }
  return amount;
}

module.exports = Expenses;
