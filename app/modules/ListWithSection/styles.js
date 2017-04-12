import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 10
  },
  rowTitle: {
    flex: 1
  },
  section: {
    backgroundColor: '#CCC',
    flexDirection: 'row',
  },
  sectionDetail: {
    margin: 5,
    fontWeight: '500',
    justifyContent: 'flex-end'
  },
  sectionName: {
    flex: 1,
    margin: 5,
    fontWeight: '500'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
    flex:1
  }
});
