import React, { Component } from 'react';
import {
  BackAndroid,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AddCategory from '../routes/AddCategory';
import AddExpense from '../routes/AddExpense';
import CategoryDetails from '../routes/CategoryDetails';
import MonthDetails from '../routes/MonthDetails';
import SelectCategory from '../routes/SelectCategory';
import Tabs from '../routes/Tabs';
let navigator;

export default class ExpenseManager extends Component {

  // Bind functions
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  // Render Navigator component
  // Initially, it will render the Tabs
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Tabs'}}
        renderScene={this.renderScene}
        ref={(nav) => { navigator = nav; }}
        configureScene={this.configureScene}
      />
    );
  }

  // Configure transitions on scene
  configureScene(route, routeStack) {
    switch (route.name) {
      case 'AddCategory':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'AddExpense':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'SelectCategory':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.FadeAndroid;
    }
  }

  // Render scenes according to name
  renderScene(route, navigator) {
    switch (route.name) {
      case 'AddCategory':
        return <AddCategory navigator={navigator} categories={route.categories} addCategory={route.addCategory}/>
      case 'AddExpense':
        return <AddExpense navigator={navigator} categories={route.categories} addExpense={route.addExpense}/>
      case 'CategoryDetails':
        return <CategoryDetails navigator={navigator} title={route.title} total={route.total} expenses={route.expenses}/>
      case 'MonthDetails':
        return <MonthDetails navigator={navigator} title={route.title} total={route.total} expenses={route.expenses}/>
      case 'SelectCategory':
        return <SelectCategory navigator={navigator} categories={route.categories} setCategory={route.setCategory}/>
      case 'Tabs':
        return <Tabs navigator={navigator}/>
      default:
        return null
    }
  }
}

// For pressing back on Android devices
BackAndroid.addEventListener('hardwareBackPress', () => {
  var currentRoutes = navigator.getCurrentRoutes();
  if (currentRoutes.length > 1) {
    requestAnimationFrame(() => {
      navigator.pop();
    });
    return true;
  }
  return false;
});

module.exports = ExpenseManager;
