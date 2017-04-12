import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from './styles';

const Header = (props) => {
  let { amount, date } = props;
  return (
    <View style={styles.main}>
      {(date) ? <Text style={styles.date}>{date}</Text> : null }
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
}

export default Header;
