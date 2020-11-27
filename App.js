import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UploadScreen from './components/UploadScreen';
import ProfileScreen from './components/ProfileScreen';
import GalleryScreen from "./components/GalleryScreen";
import Icon from "react-native-vector-icons/AntDesign";
import AuthorizationScreen from "./components/AuthorizationScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import UpdateUserScreen from "./components/UpdateUserScreen";
import {ApiContextProvider} from "./components/Context";
import UserListScreen from "./components/UserListScreen";
import DialogScreen from "./components/DialogScreen";

const Tab = createBottomTabNavigator();

const App = () => {
    return(
        <ApiContextProvider>
            <NavigationContainer>
                <Tab.Navigator initialRouteName={'Profile'}>
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreenStack}
                        options={{
                            tabBarLabel: 'Профиль',
                            tabBarIcon: ({color, size}) => <Icon name={'user'} size={size} color={color} />
                        }}
                    />
                    <Tab.Screen
                        name={'UserList'}
                        component={UserListScreenStack}
                        options={{
                            tabBarLabel: 'Диалоги',
                            tabBarIcon: ({color, size}) => <Icon name={'message1'} size={size} color={color} />
                        }}
                    />
                    <Tab.Screen
                        name={'Gallery'}
                        component={GalleryScreenStack}
                        options={{
                            tabBarLabel: 'Галерея',
                            tabBarIcon: ({color, size}) => <Icon name={'picture'} size={size} color={color} />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </ApiContextProvider>
    )

};

const UserListStack = createStackNavigator();

const UserListScreenStack = () => {
  return(
      <UserListStack.Navigator>
          <UserListStack.Screen
              name={'UserList'}
              component={UserListScreen}
              options={{title: 'Диалоги'}}
          />
          <UserListStack.Screen
              name={'Dialog'}
              component={DialogScreen}
              options={({ route }) => ({ title: route.params.headerTitle })}
          />

      </UserListStack.Navigator>
  )
};

const GalleryStack = createStackNavigator();

const GalleryScreenStack = () => {
  return(
      <GalleryStack.Navigator>
          <GalleryStack.Screen
              name={'Gallery'}
              component={GalleryScreen}
              options={{title: 'Галерея'}}
          />
          <GalleryStack.Screen
              name={'Upload'}
              component={UploadScreen}
              options={{title: 'Загрузка изображения'}}
          />
      </GalleryStack.Navigator>
  )
};

const ProfileStack = createStackNavigator();

const ProfileScreenStack = () => {
  return(
      <ProfileStack.Navigator initialRouteName={'Authorization'}>
          <ProfileStack.Screen
              name={'Profile'}
              component={ProfileScreen}
              options={{title: 'Профиль'}}
          />
          <ProfileStack.Screen
              name={'Authorization'}
              component={AuthorizationScreen}
              options={{title: 'Авторизация'}}
          />
          <ProfileStack.Screen
              name={'Registration'}
              component={RegistrationScreen}
              options={{title: 'Регистрация'}}
          />
          <ProfileStack.Screen
              name={'UpdateUser'}
              component={UpdateUserScreen}
              options={{title: 'Редактировать'}}
          />
      </ProfileStack.Navigator>
  )
};

export default App;
