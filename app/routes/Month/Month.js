import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'underscore';
import Expenses from '../../helpers/Expenses';
import Header from '../../modules/Header';
import List from '../../modules/List';
import moment from 'moment';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.editCategory = this.editCategory.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.onPressRow = this.onPressRow.bind(this);
  }

  render() {
    let expensesMonth = Expenses.getExpenses(this.props.expenses, 'MMMM YYYY');
    let expenses = this.getExpenses(expensesMonth);
    let amount = Expenses.computeAmount(expensesMonth).toFixed(2);
    let date = moment(new Date()).format('MMMM YYYY');

    return (
      <View>
        <Header amount={amount} date={date} />
        <List items={expenses} onPressRow={this.onPressRow}/>
      </View>
    );
  }

  getExpenses(expenses) {
    expenses = this.editCategory(expenses);
    return Expenses.sumUpByCategory(expenses).reverse();
  }

  // Return an array of expenses with date as its new category
  // so that we can just reuse the List module
  editCategory(expenses) {
    let expensesNew = [];
    for (let i = 0; i < expenses.length; i++) {
      let date = expenses[i].date;
      let e = {
        amount: expenses[i].amount,
        category: moment(date).format('DD-ddd'),
        date: expenses[i].date,
        details: expenses[i].details,
      }
      expensesNew.push(e);
    }
    return expensesNew;
  }

  // Called when a row is clicked
  // Get the date selected and create a new date format with that.
  // Then, get the expenses in that particular date by passing a Date object in Expenses.getExpenses.
  onPressRow(data) {
    let dateArray = data.title.split('-');
    let nowMonth = moment(new Date()).format('YYYY-MM');
    let date = nowMonth + '-' + (parseInt(dateArray[0])+1);
    let expenses = Expenses.getExpenses(this.props.expenses, 'DD MMMM YYYY, dddd', date);

    this.props.navigator.push({
      name: 'MonthDetails',
      title: data.title,
      total: data.detail,
      expenses: expenses
    });
  }
}
