import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ProfilePage extends React.Component {
    render() { 
        return <View style={styles.container}>
            <Text>Profilo</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
      },
})
 
export default ProfilePage;