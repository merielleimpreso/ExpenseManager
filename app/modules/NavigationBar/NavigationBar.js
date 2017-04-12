import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from './styles';

const NavigationBar = (props) => {
  let { title, renderHeaderAction } = props;
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>{title}</Text>
      {(renderHeaderAction) ? renderHeaderAction() : null }
    </View>
  );
}

export default NavigationBar;
