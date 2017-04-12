import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'underscore';
import Expenses from '../../helpers/Expenses';
import Header from '../../modules/Header';
import ListWithSection from '../../modules/ListWithSection';
import moment from 'moment';

export default class Today extends Component {
  render() {
    let expensesToday = Expenses.getExpenses(this.props.expenses, 'DD MMMM YYYY, dddd');
    let amount = Expenses.computeAmount(expensesToday).toFixed(2);
    let dateToday = moment(new Date()).format('DD MMMM YYYY, dddd');

    return (
      <View>
        <Header amount={amount} date={dateToday} />
        <ListWithSection expenses={expensesToday} />
      </View>
    );
  }

}
