import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import _ from 'underscore';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../modules/NavigationBar';
import styles from './styles';

export default class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      amount: 0,
      details: null
    }
    this.goToCategorySelection = this.goToCategorySelection.bind(this);
    this.onPressCheck = this.onPressCheck.bind(this);
    this.renderHeaderAction = this.renderHeaderAction.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  render() {
    let category = (this.state.category) ? this.state.category : 'Category';
    let categoryStyle = (this.state.category) ? {color: 'black'} : {};
    return (
      <View>
        <NavigationBar title={'Add Expense'} renderHeaderAction={() => this.renderHeaderAction()} />

        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={() => this.goToCategorySelection()}>
            <View style={styles.category}>
              <Text style={[styles.categoryText, categoryStyle]}>{category}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            ref="amount"
            placeholder="Amount"
            onChangeText={(amount) => {
              this.setState({amount: amount})
            }}
            selectionColor='#ccc'
            keyboardType='numeric'
            returnKeyType='next'
            clearTextOnFocus={true}
          />
          <TextInput
            ref="details"
            placeholder="Details"
            value={this.state.details}
            onChangeText={(details) => {
              details = (details.trim() == '') ? '' : details;
              this.setState({details: details})
            }}
            selectionColor='#ccc'
            keyboardType='default'
            returnKeyType='done'
            autoCapitalize='sentences'
          />
        </View>
      </View>
    );
  }

  renderHeaderAction() {
    return (
      <TouchableOpacity onPress={() => this.onPressCheck()} style={styles.headerAction}>
        <Icon name='check' size={22} />
      </TouchableOpacity>
    );
  }

  onPressCheck() {
    if (_.isEmpty(this.state.category)) {
      ToastAndroid.show('Please select a category', ToastAndroid.SHORT);
    } else if (_.isEmpty(this.state.amount)) {
      this.refs.amount.focus();
      ToastAndroid.show('Please enter an amount', ToastAndroid.SHORT);
    } else if (isNaN(this.state.amount)) {
      this.refs.amount.clear();
      this.refs.amount.focus();
      ToastAndroid.show('Amount should be in numbers', ToastAndroid.SHORT);
    } else if (_.isEmpty(this.state.details)) {
      this.refs.details.focus();
      ToastAndroid.show('Please fill up the details', ToastAndroid.SHORT);
    } else {
      let data = {
        amount: this.state.amount,
        category: this.state.category,
        details: this.state.details
      }
      this.props.addExpense(data);
      this.props.navigator.pop();
    }
  }

  goToCategorySelection() {
    this.props.navigator.push({
      name: 'SelectCategory',
      categories: this.props.categories,
      setCategory: this.setCategory
    })
  }

  setCategory(category) {
    this.setState({
      category: category
    })
  }
}
