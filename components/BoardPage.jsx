import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class BoardPage extends React.Component {
    state = {
        nameLine:"",
        direction: null
    }
    componentDidMount(){
        if(this.props.route.params != null){
            const { line, direction} = this.props.route.params
            this.state.nameLine = line
            this.state.direction = direction
            this.setState(this.state)
        }
     }

    render() { 
        if(this.state.direction != null){
        return <View>
            <Text>Linea: {this.state.nameLine}</Text>
            <Text>Direzione: {this.state.direction.sname}</Text>
            <Text>DID: {this.state.direction.did}</Text>
        </View>;
        }
        else
            return <View></View>
    }
}
 
export default BoardPage;