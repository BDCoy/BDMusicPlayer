import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';
import AppStyles from '../../../App.styles';

function Controller({ iconName, onPressFn }) {
  const getIconName = type => {
    switch (type) {
      case 'BACK':
        return 'backward';
      case 'PLAY':
        return 'play';
      case 'PAUSE':
        return 'pause';
      case 'NEXT':
        return 'forward';
      default: break;
    }
    return true;
  };

  return (
    <Button
      buttonStyle={AppStyles.button}
      containerStyle={AppStyles.buttonContainer}
      onPress={() => onPressFn()}
      type="clear"
      icon={(
        <Icon
          name={getIconName(iconName)}
          size={20}
          type="font-awesome-5"
          color="#FD9774"
        />
      )}
    />
  );
}

Controller.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPressFn: PropTypes.elementType.isRequired,
};

export default Controller;
