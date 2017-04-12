import React, { Component } from 'react';
import {
  View
} from 'react-native';
import moment from 'moment';
import Header from '../../modules/Header';
import NavigationBar from '../../modules/NavigationBar';
import ListWithSection from '../../modules/ListWithSection';

export default class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: null
    }
  }

  componentWillMount() {
    let expenses = this.props.expenses;
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
    this.setState({
      expenses: expensesNew
    });
  }

  render() {
    if (this.state.expenses) {
      return (
        <View>
          <NavigationBar title={this.props.title} />
          <Header amount={this.props.total} />
          <ListWithSection expenses={this.state.expenses}/>
        </View>
      );
    }
    return <View />;
  }

}
