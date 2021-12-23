import React, { Component } from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
  );

class Row extends React.Component {
    render() { 
        const line = this.props.data["item"]
        const nameLine = line["terminus1"]["sname"] + " - " + line["terminus2"]["sname"]
        return <View style={styles.rowStyle}>
        <Separator/>
        <Text style={{fontSize:25}}>Linea</Text>
        <Text style={styles.lineName}>{nameLine}</Text>
        <Separator/>
        <View>
            <View>
                <Button title={"Direzione " + line["terminus1"]["sname"]} onPress={() => this.props.handleLineClick(line["terminus1"], line["terminus2"])}/>
            </View>
        </View>
        <Separator/>
        <View>
            <View>
                <Button title={"Direzione " + line["terminus2"]["sname"]} onPress={() => this.props.handleLineClick(line["terminus2"], line["terminus1"])}/>
            </View>
        </View>
        <Separator/>
    </View>;
    }


}

 
const styles = StyleSheet.create({
    lineName:{
        fontSize: 20,
        color: "#656CEE",
        fontWeight: 'bold'
    },
    rowStyle:{
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
    directionStyle:{
        fontSize: 15
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
  });
export default Row;