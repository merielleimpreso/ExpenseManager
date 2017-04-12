import React, { Component } from 'react';
import {
  View
} from 'react-native';
import moment from 'moment';
import Header from '../../modules/Header';
import NavigationBar from '../../modules/NavigationBar';
import ListWithSection from '../../modules/ListWithSection';

export default class MonthDetails extends Component {
  render() {
    if (this.props.expenses) {
      return (
        <View>
          <NavigationBar title={this.props.title} />
          <Header amount={this.props.total} />
          <ListWithSection expenses={this.props.expenses}/>
        </View>
      );
    }
    return <View />;
  }
}
