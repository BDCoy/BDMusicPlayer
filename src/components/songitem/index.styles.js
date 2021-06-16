import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  songNameListContainer: {
    width: 150,
  },
  songNameList: {
    fontSize: 13,
    color: 'rgb(250, 147, 109)',
    overflow: 'hidden',
  },
  artistNameList: {
    color: 'rgb(250, 147, 109)',
    fontSize: 14,
  },
  avatarContainer: {
    backgroundColor: 'rgba(254, 238, 231, 0.303)',
  },
  avatarTitle: {
    color: 'rgb(250, 147, 109)',
  },
  info: {
    paddingLeft: 10,
    textAlign: 'left',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  songsActive: {
    borderStartWidth: 5,
    borderColor: 'rgb(250, 147, 109)',
    backgroundColor: '#f9fcf9',
  },
  songsInactive: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 14,
    paddingBottom: 14,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default styles;
