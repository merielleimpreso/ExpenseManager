import React, { Component } from 'react';
import {
  LayoutAnimation,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import _ from 'underscore';
import styles from './styles';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRows(this.props.items);
    if (this.props.items.length > 0) {
      return (
        <ListView ref='listview'
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={true}
        />
      );
    }
    return <View />;
  }

  renderRow(data) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => {this.props.onPressRow(data)}}>
        <Text style={styles.rowTitle}>{data.title}</Text>
        <Text>{data.detail}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator} key={sectionID+'_'+rowID}/>
    );
  }

}
