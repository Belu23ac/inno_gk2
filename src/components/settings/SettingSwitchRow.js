import { View, Text, Switch } from 'react-native';
import { AccountSettingsStyle } from '../../styles/AccountSettingsStyle';
import { Colors } from '../../styles/Colors';

export default function SettingSwitchRow({ label, caption, value, onValueChange, last=false }){
  return (
    <View style={[AccountSettingsStyle.row, last && AccountSettingsStyle.rowLast]}>
      <View style={AccountSettingsStyle.rowText}>
        <Text style={AccountSettingsStyle.label}>{label}</Text>
        {caption ? <Text style={AccountSettingsStyle.caption}>{caption}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.lightGray, true: Colors.primarySoft }}
        thumbColor={Colors.surface}
      />
    </View>
  );
}
