import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinesPage from './components/LinesPage';
import BoardPage from './components/BoardPage';
import ProfilePage from './components/ProfilePage';
import CommunicationController from './CommunicationController';
import { MyContext } from './context';
import CreatePostPage from './components/CreatePostPage';
import StorageManager from './StorageManager';
import MapPage from './components/MapPage';


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
            <Stack.Screen name="Lines" component={LinesPage} options={({navigation}) => ({title: "Linee", headerRight: () => (
                          <TouchableOpacity activeOpacity={0.7}  style={styles.btnProfile} onPress={() => navigation.navigate("Profile")}>
                          <Image
                              source={require('./assets/icon-profile.png')}
                              style={styles.imgBtnProfile}
                          />
                      </TouchableOpacity>
            )})}/>
            <Stack.Screen name="Board" component={BoardPage} options={({navigation}) => ({title: "Bacheca", headerRight: () => (
                          <TouchableOpacity activeOpacity={0.7}  style={styles.btnProfile} onPress={() => navigation.navigate("Profile")}>
                          <Image
                              source={require('./assets/icon-profile.png')}
                              style={styles.imgBtnProfile}
                          />
                      </TouchableOpacity>
            )})}/>
            <Stack.Screen name="CreatePost" component={CreatePostPage} options={{title: "Crea Post"}}/>
            <Stack.Screen name="Profile" component={ProfilePage} options={{title: "Il tuo Profilo"}}/>
            <Stack.Screen name="Map" component={MapPage} options={{title: "Mappa"}}/>
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
        const sm = new StorageManager();
        sm.initDB(result => {console.log("Tabella Creata")}, error => {console.log(error)})
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
  btnProfile: {
    marginBottom:4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
},
imgBtnProfile:{
    resizeMode: 'contain',
    width: 50,
    height: 50,
},
});

export default App;
