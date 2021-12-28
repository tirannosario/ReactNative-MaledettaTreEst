import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import CommunicationController from '../CommunicationController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../context';


const Separator = () => (
    <View style={styles.separator} />
  );

const delay_values = ["In Orario", "Di pochi minuti", "Oltre 15 minuti", "Treni Soppressi"]
const status_values = ["Situazione ideale", "Accettabile", "Gravi problemi per i passeggeri"]


class Post extends React.Component {
    static contextType = MyContext

    state = {
        pic:"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"
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
                <View style={[styles.rowStyle, styles.firstRow]}>
                    <Image style={styles.img} source={{uri:'data:image/png;base64,' + this.state.pic}}/>
                    <Text style={styles.authorName}>{post.authorName}</Text>
                    <Button title={post.followingAuthor ? "Non Seguire" : "Segui"} onPress={() => this.handleFollowUser(post.author, post.followingAuthor)}></Button>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={styles.leftItem}>Ritardo</Text>
                    <Text style={styles.rightItem}>Stato</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.importantInfo, styles.leftItem]}>{delay_values[post.delay] != undefined ? delay_values[post.delay] : "//"}</Text>
                    <Text style={[styles.importantInfo, styles.rightItem]}>{status_values[post.status] != undefined ? status_values[post.status] : "//"}</Text>
                </View>
                <Separator/>
                <Text>Commento</Text>
                <Text style={styles.importantInfo}>{post.comment != undefined ? post.comment : "//"}</Text>
                {/* tolgo i millisecondi */}
                <Separator/>

                <Text>{post.datetime.replace(post.datetime.substr(post.datetime.indexOf('.'), post.datetime.length), "")}</Text> 

                {/* <Text>following Author : {post.followingAuthor}</Text> */}
                {/* <Text>pversion : {post.pversion}</Text> */}
                {/* <Text>author : {post.author}</Text> */}
            <Separator/>
        </View>;
    }

    handleFollowUser = (uid, alreadyFollow) => {
        const sid = this.context.sid
        if(alreadyFollow)
            CommunicationController.unfollow(sid, uid).then(unmarshalledObject => this.props.refreshBoard())
        else
            CommunicationController.follow(sid, uid).then(unmarshalledObject => this.props.refreshBoard())
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
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 0,
        margin: 10,
    },
    img: {
        // flex: 1,
        width: 50,
        height: 50,
    },
    rowStyle:{
        paddingTop: 0,
        paddingLeft:15,
        paddingRight:15,
        width: "100%",
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    authorName:{
        fontWeight: 'bold',
        fontSize: 17,
    },
    importantInfo:{
        color: 'orange',
        fontSize: 15,
        fontWeight: '600',
        maxWidth: "35%",
        textAlign: 'center'
    },
    leftItem:{
        textAlign: 'left',
        marginLeft: "11%"
    },
    rightItem:{
        textAlign: 'right',
        marginRight: "11%"
    },
    firstRow:{
        alignItems: 'center'
    }
  });
 
export default Post;