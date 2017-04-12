import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'underscore';
import Expenses from '../../helpers/Expenses';
import List from '../../modules/List';
import NavigationBar from '../../modules/NavigationBar';
import Strings from '../../helpers/Strings';
import moment from 'moment';

export default class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.onPressRow = this.onPressRow.bind(this);
  }

  render() {
    let categoriesNew = [];
    let categories = this.props.categories;
    for (let i = 0; i < categories.length; i++) {
      let c = {
        title: Strings.capitalizeWords(categories[i])
      }
      categoriesNew.push(c);
    }

    return (
      <View>
        <NavigationBar title={'Select a Category'} />
        <List items={categoriesNew} onPressRow={this.onPressRow}/>
      </View>
    );
  }

  onPressRow(data) {
    this.props.setCategory(data.title);
    this.props.navigator.pop();
  }

}
