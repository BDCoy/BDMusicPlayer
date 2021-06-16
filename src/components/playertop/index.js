import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import styles from './index.styles';
import AppStyles from '../../../App.styles';

function PlayerTop() {
  const navigation = useNavigation();
  return (
    <View style={styles.groupTop}>
      <Button
        buttonStyle={AppStyles.button}
        containerStyle={AppStyles.buttonContainer}
        onPress={() => navigation.navigate('SongList')}
        type="clear"
        icon={(
          <Icon
            name="arrow-left"
            size={20}
            type="font-awesome-5"
            color="#FD9774"
          />
        )}
      />
      <Text style={styles.title}>Playing Now!</Text>
    </View>
  );
}

export default PlayerTop;
