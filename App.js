import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinesPage from './components/LinesPage';
import BoardPage from './components/BoardPage';
import CommunicationController from './CommunicationController';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  state = {
    did: null
  }

  componentDidMount(){
    this.checkSid().then().catch(error => console.log(error));
    this.checkDid().then().catch(error => console.log(error));
  }

  render() {
    if(this.state.did != null){
      if(this.state.did === -1)
        initialPage = "Lines"
      else
        initialPage = "Board"

      return <NavigationContainer>
        <Stack.Navigator initialRouteName={initialPage}>
          {/* il Navigation viene passato tra i props agli Screen Figli */}
          <Stack.Screen name="Lines" component={LinesPage} options={{title: "Linee"}}/>
          <Stack.Screen name="Board" component={BoardPage} options={{title: "Bacheca"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    }
    else
      return <View><Text>Carimento...</Text></View>
  }

  async checkSid() {
    const sid = await AsyncStorage.getItem("sid")
    if (sid) {    
        console.log("Ho già il SID: " + sid)
    }
    else
    {
        CommunicationController.register()
        .then(unmarshelledObject => {
          console.log("Registrazione...SID recuperato: " + unmarshelledObject["sid"]);
          AsyncStorage.setItem("sid", unmarshelledObject["sid"]);
        })
    }
  }

  async checkDid() {
    const did = await AsyncStorage.getItem("did")
    if (did) {    
        console.log("Ho già il DID: " + did)
        this.setState({did: did})
    }
    else
      this.setState({did: -1})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
