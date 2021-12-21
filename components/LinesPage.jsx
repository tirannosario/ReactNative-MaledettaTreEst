import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class LinesPage extends React.Component {
    render() { 
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Vai Alla Bacheca" onPress={() => this.props.navigation.navigate("Board")}/> 
      </View>
    }
}
 
export default LinesPage;