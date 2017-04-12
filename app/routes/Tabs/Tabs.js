import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View, StyleSheet, ToastAndroid } from 'react-native';
import _ from 'underscore';
import moment from 'moment';
import Category from '../Category';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../modules/NavigationBar';
import Month from '../Month';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../modules/TabBar';
import Today from '../Today';

import data from '../../main/data.json';
const TABS = ['Today', 'Category', 'Month'];

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: data['categories'],
      expenses: data['expenses'],
      isLoading: true,
      selectedTabIndex: 0
    }
    this.addCategory = this.addCategory.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.onPressAdd = this.onPressAdd.bind(this);
    this.renderHeaderAction = this.renderHeaderAction.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('categories').then((result) => {
      if (_.isEmpty(result)) {
        AsyncStorage.setItem('categories', JSON.stringify(this.state.categories));
      } else {
        this.setState({
          categories: JSON.parse(result)
        });
      }
      AsyncStorage.getItem('expenses').then((result) => {
        if (_.isEmpty(result)) {
          AsyncStorage.setItem('expenses', JSON.stringify(this.state.expenses));
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({
            expenses: JSON.parse(result),
            isLoading: false
          });
        }
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    }
    let title = TABS[this.state.selectedTabIndex];
    return (
      <View style={{flex:1}}>
        <NavigationBar title={title} renderHeaderAction={this.renderHeaderAction} />
        <ScrollableTabView
          ref="scrollableTabView"
          initialPage={0}
          renderTabBar={() => <TabBar tabFor="MainTab" />}
          onChangeTab={(tab) => {this.setState({selectedTabIndex: tab.i})}}
          style={{backgroundColor: 'white'}}>
          <View tabLabel="clock-o">
            <Today navigator={this.props.navigator}
              expenses={this.state.expenses}
              categories={this.state.categories}/>
          </View>
          <View tabLabel="server">
            <Category navigator={this.props.navigator}
              expenses={this.state.expenses}
              categories={this.state.categories}
              tabLabel='Category' />
          </View>
          <View tabLabel="calendar-o">
            <Month navigator={this.props.navigator}
              expenses={this.state.expenses}/>
          </View>
        </ScrollableTabView>
      </View>
    );
  }

  renderHeaderAction() {
    let key = this.state.selectedTabIndex;
    if (key == '0' || key == '1') {
      return (
        <TouchableOpacity onPress={() => this.onPressAdd()} style={styles.headerAction}>
          <Icon name='plus' size={22} />
        </TouchableOpacity>
      )
    }
    return null;
  }

  onPressAdd() {
    let key = this.state.selectedTabIndex;
    if (key == '0') {
      this.props.navigator.push({
        name: 'AddExpense',
        categories: this.state.categories,
        navigator: this.props.navigator,
        addExpense: this.addExpense
      });
    } else if (key == '1') {
      this.props.navigator.push({
        name: 'AddCategory',
        categories: this.state.categories,
        addCategory: this.addCategory
      });
    }
  }

  addCategory = (category) => {
    let categories = this.state.categories;
    categories.push(category);
    this.setState({
      categories: categories
    });
    AsyncStorage.setItem('categories', JSON.stringify(categories));
    ToastAndroid.show('Successfully added a category', ToastAndroid.SHORT)
  }

  addExpense = (data) => {
    let expenses = this.state.expenses;
    data['date'] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    expenses.push(data);
    this.setState({
      expenses: expenses
    });
    AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    ToastAndroid.show('Successfully updated your expenses', ToastAndroid.SHORT)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAction: {
    marginRight: 10,
    marginTop: 5,
  },
});
