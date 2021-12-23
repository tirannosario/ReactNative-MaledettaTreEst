import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../CommunicationController';
import { MyContext } from '../context';
import Post from './Post';


class BoardPage extends React.Component {
    static contextType = MyContext

    state = {
        did: null,
        stations: [],
        posts: []
    }
    componentDidMount(){
        const sid = this.context.sid
        this.checkDid().then(did => {
            console.log("Bacheca n." + did)
            this.state.did = did
            CommunicationController.getStations(sid, did)
            .then(unmarshelledObject => this.state.stations = unmarshelledObject.stations)
            .then(CommunicationController.getPosts(sid, did)
            .then(unmarshelledObject => {
                this.state.posts = unmarshelledObject.posts
                this.setState(this.state)
            }))
        })
    }

    render() { 
        if(this.state.did != null && this.state.stations.length!=0 && this.state.posts.length!=0){
        return <View>
            <View style={styles.infoStyle}>
                <View style={styles.infoDirectionStyle}>
                    <Text style={[styles.directionStyle, {textAlign:'left'}]}>{this.state.stations[0].sname}</Text>
                    <Button style={styles.detailBtnStyle} title="Inverti" onPress={() => this.switchDirection()}></Button>
                    <Text style={[styles.directionStyle, {textAlign:'right'}]}>{this.state.stations[this.state.stations.length-1].sname}</Text>
                </View>
                <Button style={styles.detailBtnStyle} title="Dettagli Tratta"></Button>
            </View>
            <View>
            <FlatList
                data={this.state.posts}
                renderItem={(item) => {return (<Post data={item}/>)}}
                keyExtractor={item => item.datetime}
            />
            </View>
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

    switchDirection = () => {
        AsyncStorage.getItem("inverseDid")
        .then(inverseDid => {
            AsyncStorage.setItem("inverseDid", this.state.did)
            .then(AsyncStorage.setItem("did", inverseDid))
            .then(this.componentDidMount())
            .catch(error => console.log(error))
        })
    }
}


const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    infoStyle: {
        alignItems: 'center',
        shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {
              width: 1.5,
              height: 1.5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 2,
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 12,
            margin: 10,
    },
    infoDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    directionStyle:{
        flex:1,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center'
    },
    detailBtnStyle:{
        flex:1,
        textAlign: 'center',
        marginLeft: 5,
        marginRight:5
    }
  });
 
export default BoardPage;