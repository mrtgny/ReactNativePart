/**
 * Created by muratguney on 21/12/2016.
 */
import React from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity, Image} from 'react-native';
import {fetchData} from '../actions';
import {connect} from 'react-redux';
import moment from 'moment';
const Categories = [
    {
        type: "Son Dakika"
    },
    {
        type: "Spor"
    },
    {
        type: "Ekonomi"
    },
];
const randomImageUrl = "https://unsplash.it/200/300/?random";
export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: 0
        }
    }

    createdDate(date){
        const dayArray = moment(date).fromNow().split(" ")
        const time = (dayArray[0]=="a" || dayArray[0]=="an") ? "1" : dayArray[0];
        const dsc =(dayArray[1]=="days" || dayArray[1]=="day") ? " gün öce yayınlandı" : (dayArray[1] == "hours"  || dayArray[1]=="hour")? " saat önce yayınlandı" : dayArray[1] == "years" ? "yıl önce yayınlandı" : (dayArray[1]=="minute" || dayArray[1]=="minutes") ? "dakika önce yayınlandı" : ""
        return time+dsc
    }

    render() {
        return (
            <View style={style.wrapperSnap}>
                            {this.props.data && this.props.data.map((item, index) =>
                                <TouchableOpacity key={index}
                                                  style={style.snap}
                                                  activeOpacity={0.6}
                                                  onPress={()=>this.props.select(index,item)}
                                >
                                    <Image
                                        style={{width:360,height:310}}
                                        source={{uri:randomImageUrl}}
                                        defaultSource={require('./../images/IMG_5437.png')}
                                    />
                                    <View style={style.dscWrapper}>
                                        <Text style={style.createdTime}>{this.createdDate(item.CreatedDate)}</Text>
                                        <Text numberOfLines={1} style={style.title}>{item.Title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
            </View>
        )
    }
}


const style = {
    container:{
        paddingTop:30,
        backgroundColor:"white",
        flex:1,
    },
    dscWrapper:{
        width:360
    },

    createdTime:{
        right:10,
        top:5,
        position:"absolute",
        zIndex:99,
        fontSize:8,
        color:"gray"
    },
    title: {
        backgroundColor: "white",
        fontSize: 20,
        color: "black",
        paddingTop:20,
        marginBottom:10,
        fontWeight:"bold",
        padding: 10,
    },
};
