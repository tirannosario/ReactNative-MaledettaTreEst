import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { MyContext } from '../context';
import CommunicationController from '../CommunicationController';
import Row from './Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
);

class LinesPage extends React.Component {
    static contextType = MyContext

    state = {
        lines:[]
    }

    componentDidMount(){
        const sid = this.context.sid
        CommunicationController.getLines(sid)
        .then(unmarshelledObject => {
            this.state.lines = unmarshelledObject["lines"]
            this.setState(this.state)
            // se ho già scelto un did in precedenza mi riporta alla corrispettiva bacheca
            this.checkDid().then(did => {
                if(did != -1)
                    this.props.navigation.navigate("Board")
            })
        })
        .catch(error => console.log("ERRORE " + error))
    }

    render() {
        return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.95}  style={styles.btnProfilo}>
             <Text>Profilo</Text>
        </TouchableOpacity>
        <Text style={styles.titleLine}>Scegli una Direzione</Text>
        <View style={styles.listLines}>
            <FlatList
                data={this.state.lines}
                renderItem={(item) => {return (<Row data={item} handleLineClick={this.handleLineClick}/>)}}
                keyExtractor={item => item["terminus1"]["sname"] + " - " + item["terminus2"]["sname"]}
            />
        </View>
      </View>
    }

    handleLineClick = (nameLine, direction) => {
        // console.log(nameLine + " : " + direction)
        AsyncStorage.setItem("did", direction.did.toString());
        this.props.navigation.navigate("Board")
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


const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: 'space-evenly',
    },
    btnProfilo: {
        height: "5%",
        width: "20%",
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'purple',
        top: 20,
        right: 20,
        elevation:3,
    },
    listLines:{
        flex:4,
        fontSize: 10,
        color: "black",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    titleLine:{
        fontSize: 25,
        flex:0.5,
        marginTop: 20,
        marginLeft: 20
    },
    singleLine:{
        flex: 1
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
  });

export default LinesPage;