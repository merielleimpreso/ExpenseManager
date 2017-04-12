import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  date: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    margin: 10
  },
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
