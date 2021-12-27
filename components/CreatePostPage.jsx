import React, { Component } from 'react';
import { StatusBar, Button, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import CommunicationController from '../CommunicationController';
import { MyContext } from '../context';



class CreatePostPage extends React.Component {
    static contextType = MyContext

    state = {
        sid : -1,
        did : -1,
        line : "",
        direction : "",
        delay : -1,
        status : -1,
        comment : ""
    }

    componentDidMount(){
        this.state.sid = this.context.sid
        const { did, line, direction } = this.props.route.params;
        this.state.did = did
        this.state.line = line
        this.state.direction = direction
        this.setState(this.state)        
    }

    render() { 
        if(this.state.did != -1)
        {
            return <View style={styles.container}>
                <Text style={styles.txtLinea}>{"Linea " + this.state.line}</Text>
                <Text style={styles.txtDirezione}>{"Direzione " + this.state.direction}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeDelay}
                    placeholder="Digita Ritardo [0,3]"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeState}
                    placeholder="Digita Stato [0,2]"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeComment}
                    placeholder="Digita Commento <= 100 char"
                />
                <Button style={styles.btnCreate} title="Pubblica" onPress={() => this.createPost()}/>
            </View>
        }
        return <View><Text>Loading...</Text></View>
    }

    createPost = () => {
        if(this.state.delay != -1 || this.state.status != -1 || this.state.comment != ""){
            CommunicationController.addPost(this.state.sid, this.state.did, this.state.delay, this.state.status, this.state.comment)
            .then(result => {
                alert("Post pubblicato con successo")
                this.props.navigation.goBack()
            })
            .catch(error => {
                console.log(error);
                alert("Errore nella pubblicazione del Post, riprovare")
            })
        }
        else{
            alert("Fornire almeno un parametro!")
        }
    }

    onChangeDelay = (value) => {
        if(value < 0 || value > 3)
            alert("Delay compreso tra 0 e 3, pls")
        else {
            console.log("Ritardo cambiato " + value)
            this.state.delay = parseInt(value);
        }
    }

    onChangeState = (value) => {
        if(value < 0 || value > 2)
            alert("Stato compreso tra 0 e 2, pls")
        else {
            console.log("Stato cambiato " + value)
            this.state.status = parseInt(value);
        }
    }

    onChangeComment = (value) => {
        if(value.length > 100)
            alert("Commento più piccolo di 100 caratteri, pls")
        else {
            console.log("Commento cambiato " + value)
            this.state.comment = value;
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    txtLinea : {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "normal",
        color: "orange"
    },
    txtDirezione : {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: "orange"
    },
    btnCreate : {
        flex: 1
    },
  });
 
export default CreatePostPage;