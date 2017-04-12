import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import _ from 'underscore';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../../modules/NavigationBar';
import styles from './styles';


export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.renderHeaderAction = this.renderHeaderAction.bind(this);
    this.onPressCheck = this.onPressCheck.bind(this);
  }

  render() {
    return (
      <View>
        <NavigationBar title={'Add Category'} renderHeaderAction={() => this.renderHeaderAction()} />
        <View style={styles.form}>
          <TextInput
            ref='category'
            placeholder="Category"
            onChangeText={(category) => {
              this.setState({category: category})
            }}
            selectionColor='#ccc'
            keyboardType='default'
            returnKeyType='next'
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
      ToastAndroid.show('Please fill up the category', ToastAndroid.SHORT);
    } else {
      if (!_.contains(this.props.categories(), this.state.category.toLowerCase())) {
        this.props.addCategory(this.state.category.toLowerCase());
        this.props.navigator.pop();
      } else {
        ToastAndroid.show('Category already exists', ToastAndroid.SHORT);
      }
    }
  }

}
