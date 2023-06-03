import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react';
import Constants from 'expo-constants';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';


import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { InnerContainer, PageTitle, StyledContainer } from '../components/style';
import Posts from '../components/Posts';

const Home = (props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    // Call your API or fetch data here
    setTimeout(() => setIsRefreshing(false), 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeLayout}>
        <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }>
          <Posts navigation={props.navigation} />
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Ionicons
              name='ios-reload-circle-sharp'
              style={{ fontSize: 60, opacity: 0.2 }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  homeLayout: {
    backgroundColor: 'white',
    height: '100%'
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 15
  }
})