import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

const ToggleButton = ({online}) => {
  const [isEnabled, setIsEnabled] = useState(online);
  const toggleSwitch = () => 
  {
    setIsEnabled(previousState => !previousState);
  }

  return (
    
      <Switch
        style={styles.switch}
        trackColor={{ true: "green"}}
        thumbColor={isEnabled ? "#fffff" : "#ffffff"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    
  );
};
const styles=StyleSheet.create(
{
    switch: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1 }], // Increase the size of the Switch component
      },
}
);




export default ToggleButton;