import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image, 
  TextInput,
  AppRegistry,
} from 'react-native';


import LoginForm from './src/components/LoginForm';
import Home from './src/components/Home';
import Chart from './src/components/Chart';
import Notification from './src/components/Notification';
import Private from './src/components/Private';

import { Provider, useSelector } from 'react-redux';
import {store } from './src/store/index';
import { useDispatch } from 'react-redux';
import { Init } from './src/store/actions';
import Filter from './src/components/Filter';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();

// const RootNavigation = () =>{
//   const token = useSelector(state => state.loginReducer.token)
// }

const Tabs = () =>{
  return (
      <Tab.Navigator screenOptions={{headerShown: false}} >
        <Tab.Screen name="Danh sách" component={Home} />
        <Tab.Screen name='Biểu đồ' component={Chart} />
        <Tab.Screen name='Thông báo' component={Notification} />
        <Tab.Screen name='Private' component={Private} />
      </Tab.Navigator>
  )
}

const HomeStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name='home' component={Tabs} />
      <Stack.Screen name='filter' component={Filter} />
    </Stack.Navigator>
  )
}
const AuthStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='login' component={LoginForm} />
    </Stack.Navigator>
  )
}


const RootNavigation = () =>{
  const token = useSelector(state => state.AuthReducer.token);

  const dispatch = useDispatch();
  const init = () =>{
    dispatch(Init());
  }

  useEffect(()=>{
    init();
  }, []);

  return (
    <NavigationContainer>
      {
        token === null ? <AuthStack /> : <HomeStack />
      }
    </NavigationContainer>
  )
}

const App = () =>{
  return (
    <Provider store={store} >
    <RootNavigation />
    </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formGroup: {
    width: '90%',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  },
});

export default App;
