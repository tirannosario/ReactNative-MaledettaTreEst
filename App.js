import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinesPage from './components/LinesPage';
import BoardPage from './components/BoardPage';
import CommunicationController from './CommunicationController';
import { MyContext } from './context';
import CreatePostPage from './components/CreatePostPage';


const Stack = createNativeStackNavigator();

class App extends React.Component {
  state = {
    did: null,
    sid: null
  }

  componentDidMount(){
    this.checkSid().then().catch(error => console.log(error));
  }

  render() {
    if(this.state.sid != null){
      return <MyContext.Provider value={{sid: this.state.sid}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Lines'>
            {/* il Navigation viene passato tra i props agli Screen Figli */}
            <Stack.Screen name="Lines" component={LinesPage} options={{title: "Linee"}}/>
            <Stack.Screen name="Board" component={BoardPage} options={{title: "Bacheca"}}/>
            <Stack.Screen name="CreatePost" component={CreatePostPage} options={{title: "Crea Post"}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    }
    else
      return <View><Text>Carimento...</Text></View>
  }

  async checkSid() {
    const sid = await AsyncStorage.getItem("sid")
    if (sid) {    
        console.log("Ho già il SID: " + sid)
        this.setState({sid: sid})
    }
    else
    {
        CommunicationController.register()
        .then(unmarshelledObject => {
          const newSid = unmarshelledObject["sid"];
          console.log("Registrazione...SID recuperato: " + unmarshelledObject["sid"]);
          AsyncStorage.setItem("sid", unmarshelledObject["sid"]);
          this.setState({sid: newSid})
        })
    }
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
