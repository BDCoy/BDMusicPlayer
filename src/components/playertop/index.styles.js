import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  groupTop: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#666',
    shadowOpacity: 0.05,
    shadowRadius: 0.2,
    elevation: 1,
  },
  title: {
    margin: 'auto',
    fontSize: 18,
    color: 'rgb(250, 147, 109)',
    fontWeight: 'bold',
  },
});

export default styles;
