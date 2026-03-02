import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {RootStackParamList} from '../types';
import {COLORS, FONT_SIZE} from '../constants/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: FONT_SIZE.lg,
          color: COLORS.text,
        },
        headerShadowVisible: false,
        cardStyle: {
          backgroundColor: COLORS.background,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Policy Details',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
