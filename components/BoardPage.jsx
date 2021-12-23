import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class BoardPage extends React.Component {
    state = {
        nameLine:"",
        did: null
    }
    componentDidMount(){
        this.checkDid().then(did => {
            console.log("Bacheca n." + did)
            this.state.did = did
            this.setState(this.state)
        })
    }

    render() { 
        if(this.state.did != null){
        return <View>
            <Text>DID: {this.state.did}</Text>
        </View>;
        }
        else
            return <View></View>
    }

    async checkDid() {
        const did = await AsyncStorage.getItem("did")
        if (did) {    
            console.log("Ho già il DID: " + did)
            return did
        }
        else
          return -1
      }
}
 
export default BoardPage;