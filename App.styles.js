import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#666',
    shadowOpacity: 0.05,
    shadowRadius: 0.2,
    elevation: 1,
  },
});

export default AppStyles;
