/**
 * Created by muratguney on 22/12/2016.
 */
import React from 'react';
import {View,Text,TouchableOpacity, Image} from 'react-native';
export default class SelectedNews extends React.Component{

    render(){
        console.log(this.props.selection);
        return(
            <View style={style.container}>
                <View style={style.imagePart}>
                <TouchableOpacity
                    style={style.image}
                    onPress={()=>this.props.goBack()}>
                        <Image
                            style={{width:400,height:400,justifyContent:"center",alignItems:"center"}}
                            source={{uri:"https://unsplash.it/200/300/?random"}}
                            defaultSource={require('../images/IMG_5437.png')}
                        />
                </TouchableOpacity>
                </View>
                <View style={style.textPart}>
                    <Text style={style.title}>
                        {this.props.selection.Title}
                        </Text>
                    <Text style={style.dsc}>
                        {this.props.selection.Description}
                        </Text>
                </View>

            </View>
        )
    }
}
const style =
    {
        container:{
            flex:1,
            marginTop:-10,
            backgroundColor:"white",
            justifyContent:"center",
            alignItems:"center",
        },
        imagePart:{
          flex:1,
        },
        textPart:{
          flex:1,
            justifyContent:"center",
            alignItems:"center",
        },
        image:{
            flex:1,
            marginTop:20,
            alignItems:"center",
            justifyContent:"center",
        },
        title:{
            fontWeight:"bold",
            fontSize:24,
            paddingTop:5,
            paddingBottom:5,
        },
        dsc:{
            fontWeight:"100",
            color:"#bbb",
            fontSize:16,
            paddingLeft:10,
            paddingRight:10,
        }
    };