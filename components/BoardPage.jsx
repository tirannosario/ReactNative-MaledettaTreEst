import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../CommunicationController';
import { MyContext } from '../context';
import Post from './Post';

class BoardPage extends React.Component {
    static contextType = MyContext

    state = {
        did: null,
        stations: [],
        postsFromFollow: [],
        postsFromAll: []
    }

    componentDidMount(){
        const sid = this.context.sid
        this.checkDid().then(did => {
            console.log("Bacheca n." + did)
            this.state.did = did
            CommunicationController.getStations(sid, did)
            .then(unmarshelledObject => {
                this.state.stations = unmarshelledObject.stations
                CommunicationController.getPosts(sid, did)
                .then(unmarshelledObject => this.handlePosts(unmarshelledObject.posts))
            })
            .catch(error => console.log(error))
        })
        //hooks che permette di eseguire delle azioni quando l'activity ritorna in focus
        this.props.navigation.addListener('focus', () => this.refreshPosts(sid, this.state.did))

    }

    render() { 
        const sid = this.context.sid

        if(this.state.did != null && this.state.stations.length!=0){
        return <View style={styles.container}>
            <View style={styles.infoStyle}>
                <View style={styles.infoDirectionStyle}>
                    <Text style={{textAlign:'left', flex:1}}>Partenza</Text>
                    <Text style={{textAlign:'right', flex:1}}>Arrivo</Text>
                </View>
                <View style={styles.infoDirectionStyle}>
                    <Text style={[styles.directionStyle, {textAlign:'left'}]}>{this.state.stations[0].sname}</Text>
                    <Button style={styles.detailBtnStyle} title="Inverti" onPress={() => this.switchDirection()}></Button>
                    <Text style={[styles.directionStyle, {textAlign:'right'}]}>{this.state.stations[this.state.stations.length-1].sname}</Text>
                </View>
                <Button style={styles.detailBtnStyle} title="Dettagli Tratta"></Button>
            </View>
            <Text style={styles.infoListStyle}>Da Utenti Seguiti</Text>
            {this.state.postsFromFollow.length > 0 ?
             (<View style={styles.postListStyle}>
                <FlatList
                    data={this.state.postsFromFollow}
                    renderItem={(item) => {return (<Post data={item} refreshBoard={() => this.refreshPosts(sid, this.state.did)}/>)}}
                    keyExtractor={item => item.datetime}
                />
            </View>)
            :
            <Text style={styles.infoText}>Nessun Post...</Text>}

            <Text style={styles.infoListStyle}>Da Tutti</Text>
            {this.state.postsFromAll.length > 0 ?
            (<View style={styles.postListStyle}>
                <FlatList
                    data={this.state.postsFromAll}
                    renderItem={(item) => {return (<Post data={item} refreshBoard={() => this.refreshPosts(sid, this.state.did)}/>)}}
                    keyExtractor={item => item.datetime}
                />
            </View>)
            :
            <Text style={styles.infoText}>Nessun Post...</Text>}

            <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.touchableStyle}
                        onPress={() => this.handleCreatePost()}
                        >
                        <Image
                            source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                            }}
                            // For local image
                            //source={require('./images/float-add-icon.png')}
                            style={styles.floatingButtonStyle}
                        />
            </TouchableOpacity>
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

    handleCreatePost = () => {
        this.props.navigation.navigate("CreatePost", {did: this.state.did,
             line: this.state.stations[0].sname + "-" +this.state.stations[this.state.stations.length-1].sname,
                direction: this.state.stations[this.state.stations.length-1].sname})
    }

    refreshPosts = (sid, did) => {
        console.log("Refresh Board " + did)
        if(sid != null && did != null){
            CommunicationController.getPosts(sid, did)
            .then(unmarshelledObject => {
                this.handlePosts(unmarshelledObject.posts)
            })
        }
    }

    handlePosts = (postsList) => {
        this.state.postsFromFollow = []
        this.state.postsFromAll = []
        for(const post of postsList){
            if(post.followingAuthor)
                this.state.postsFromFollow.push(post)
            else
                this.state.postsFromAll.push(post)
        }
        this.setState(this.state)
    }

}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    infoStyle: {
        // flex:1,
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
            padding: 18,
            margin: 16,
    },
    infoDirectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    directionStyle:{
        flex:1,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'black'
    },
    detailBtnStyle:{
        flex:1,
        textAlign: 'center',
        marginLeft: 10,
        marginRight:10,
    },
    touchableStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 40,
     },
     floatingButtonStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
      },
      postListStyle:{
          flex:4,
          marginLeft: 12,
          marginRight: 12
      },
      infoListStyle:{
          fontSize: 20,
          marginTop: 5,
          marginLeft: 16,
          fontWeight: 'bold'
      },
      infoText:{
          marginLeft: 20,
          fontSize: 16,
          color: 'grey'
      }
  });
 
export default BoardPage;