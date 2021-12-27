import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import CommunicationController from '../CommunicationController';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => (
    <View style={styles.separator} />
  );

const delay_values = ["In Orario", "Di pochi minuti", "Oltre 15 minuti", "Treni Soppressi"]
const status_values = ["Situazione ideale", "Accettabile", "Gravi problemi per i passeggeri"]


class Post extends React.Component {
    state = {
        pic:""
    }
    
    componentDidMount(){
        // const post = this.props.data.item
        // if(post.pversion > 0){
        //         console.log("Voglio la picture di " + post.author)
        //         let sm = new StorageManager();
        //         sm.getUserPicture(post.author, post.pversion,
        //             result => {
        //                 if(result.rows.length > 0) {
        //                     console.log("Ho la pic aggiornata!")
        //                     this.state.pic = result.rows._array[0].picture;
        //                     this.setState(this.state)
        //                 } 
        //                 else {
        //                     console.log("non ho la pic aggiornata")
        //                     CommunicationController.getUserPicture(this.state.sid, post.author)
        //                     .then(unmarshelledObject => {
        //                         sm.storeUserPicture(unmarshelledObject.uid, unmarshelledObject.pversion, unmarshelledObject.picture,
        //                             result => {console.log("Pic di " + unmarshelledObject.uid + " aggiornata")},
        //                             error => {console.log(error)})
        //                         this.state.pic = unmarshelledObject.picture
        //                         this.setState(this.state)
        //                     })
        //                     .catch(error => console.log("ERRORE " + error))
        //                 }
        //             },
        //             error => {console.log(error)})
        // }
    }


    render() { 
        const post = this.props.data.item
        return <View style={styles.postStyle}>
            <Separator/>
                {/* <Image style={styles.img} source={{uri:'data:image/png;base64,' + this.state.pic}}/> */}
                <Text>delay : {delay_values[post.delay]}</Text>
                <Text>status : {status_values[post.status]}</Text>
                <Text>comment : {post.comment}</Text>
                <Text>following Author : {post.followingAuthor}</Text>
                <Text>datetime : {post.datetime}</Text>
                <Text>author Name : {post.authorName}</Text>
                <Text>pversion : {post.pversion}</Text>
                <Text>author : {post.author}</Text>
            <Separator/>
        </View>;
    }

}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      img: {
        flex: 1,
        width: 66,
        height: 58,
    },
    postStyle:{
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
    }
  });
 
export default Post;