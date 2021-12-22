import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const SingleLine = ({ title }) => (
    <View style={styles.singleLine}>
      <Text>{title}</Text>
    </View>
  );

const Separator = () => (
    <View style={styles.separator} />
);

class LinesPage extends React.Component {
    state = {
        lines:[{id:1, title:"ciao"}, {id:2, title:"come"}, {id:3, title:"va"}]
    }

    renderItem(item) {
        console.log(item)
        return <SingleLine title={item.item.title} />
    }

    render() { 
        return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.95}  style={styles.btnProfilo}>
             <Text>Profilo</Text>
        </TouchableOpacity>
        <Text style={styles.titleLine}>Scegli una Direzione</Text>
        <View style={styles.listLines}>
            <FlatList
            style={styles.listLines}
            data={this.state.lines}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            />
        </View>
        {/* <Button title="Vai Alla Bacheca" onPress={() => this.props.navigation.navigate("Board")}/>  */}
      </View>
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
        backgroundColor: "yellow"
    },
    titleLine:{
        fontSize: 20,
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