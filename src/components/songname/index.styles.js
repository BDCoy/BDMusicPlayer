import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  nowPlaying: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songName: {
    fontSize: 24,
    color: 'rgb(250, 147, 109)',
  },
  artistName: {
    marginTop: 4,
    color: 'rgb(250, 147, 109)',
    fontSize: 16,
    width: 200,
    overflow: 'hidden',
  },
});

export default styles;
