import React, { Component } from 'react';
import {
  LayoutAnimation,
  ListView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';
import _ from 'underscore';
import Strings from '../../helpers/Strings';
import styles from './styles';

class ListWithSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      shownCategories: _.unique(_.pluck(this.props.expenses, 'category'))
    }
    this.mapByCategory = this.mapByCategory.bind(this);
    this.onPressSection = this.onPressSection.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    if (this.props.expenses.length > 0) {
      let dataSource = this.state.dataSource.cloneWithRowsAndSections(this.mapByCategory());
      return (
        <ListView ref='listview'
          dataSource={dataSource}
          renderSectionHeader={this.renderSectionHeader}
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

  mapByCategory() {
    let expenses = _.sortBy(this.props.expenses, 'category');
    var map = {};
    expenses.forEach(function(item) {
      if (!map[item.category]) {
        map[item.category] = [];
      }
      map[item.category].push(item);
    });
    return map;
  }

  renderRow(data) {
    if (_.contains(this.state.shownCategories, data.category)) {
      return (
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{Strings.capitalizeWords(data.details)}</Text>
          <Text>{parseFloat(data.amount).toFixed(2)}</Text>
        </View>
      );
    }
    return null;
  }

  renderSectionHeader(data, category) {
    let total = 0;
    let expensesInCategory = _.where(this.props.expenses, {category: category});
    for (let i = 0; i < expensesInCategory.length; i++) {
      let amount = parseFloat(expensesInCategory[i].amount);
      total += amount;
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressSection(category)}>
        <View style={styles.section}>
          <Text style={styles.sectionName}>{category}</Text>
          <Text style={styles.sectionDetail}>{total.toFixed(2)}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onPressSection(category) {
    let shownCategories = this.state.shownCategories;
    if (_.contains(shownCategories, category)) {
      shownCategories = _.without(shownCategories, category);
    } else {
      shownCategories.push(category);
    }
    LayoutAnimation.linear();
    this.setState({
      shownCategories: shownCategories
    });
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator} key={sectionID+'_'+rowID}/>
    );
  }

}

module.exports = ListWithSection;
