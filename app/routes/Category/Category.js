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

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      date: '',
      expenses: [],
      expensesSaved: [],
    }
    this.onPressRow = this.onPressRow.bind(this);
  }

  render() {
    let expensesMonth = Expenses.getExpenses(this.props.expenses, 'MMMM YYYY');
    let expenses = Expenses.sumUpByCategory(expensesMonth);
    let amount = Expenses.computeAmount(expensesMonth).toFixed(2);
    let date = moment(new Date()).format('MMMM YYYY');

    return (
      <View>
        <Header amount={amount} date={date} />
        <List items={expenses} onPressRow={this.onPressRow}/>
      </View>
    );
  }

  onPressRow(data) {
    let expensesMonth = Expenses.getExpenses(this.props.expenses, 'MMMM YYYY');
    let items = _.where(expensesMonth, {category: data.title});

    this.props.navigator.push({
      name: 'CategoryDetails',
      title: data.title,
      total: data.detail,
      expenses: items
    });
  }
}
