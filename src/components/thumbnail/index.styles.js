import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  photoBox: {
    width: 200,
    height: 200,
  },
  photoContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
  countSongsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countSongs: {
    color: '#FD9774',
    paddingRight: 10,
    fontSize: 12,
  },
});

export default styles;
