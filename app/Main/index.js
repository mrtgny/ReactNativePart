/**
 * Created by muratguney on 21/12/2016.
 */
import React from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity, Image,TabBarIOS} from 'react-native';
import {fetchData} from '../actions';
import NewsList from './NewsList';
import SelectedNews from './SelectedNews';
import {connect} from 'react-redux';
import moment from 'moment';
import LeftNav from './LeftNav';
import Drawer from 'react-native-drawer';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNewsIndex:-1,
            selectedNewsData:[],
        }
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    createdDate(date){
        const dayArray = moment(date).fromNow().split(" ");
        const time = (dayArray[0]=="a" || dayArray[0]=="an") ? "1" : dayArray[0];
        const dsc =(dayArray[1]=="days" || dayArray[1]=="day") ? " gün öce yayınlandı" : (dayArray[1] == "hours"  || dayArray[1]=="hour")? " saat önce yayınlandı" : dayArray[1] == "years" ? "yıl önce yayınlandı" : (dayArray[1]=="minute" || dayArray[1]=="minutes") ? "dakika önce yayınlandı" : ""
        console.log(dayArray);
        return time+dsc
    }

    componentWillMount() {
        //this.load()
    }

    load() {
        this.props.fetchData({name: 'spor'});
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.menu}>
                <ScrollView
                    contentContainerStyle={style.menuContent}
                    horizontal={true}
                    ref={(scrollView) => { _scrollViewHorizontal = scrollView; }}
                >
                    {Categories.map((cat, index) =>
                        <TouchableOpacity
                            onPress={(e)=>_scrollViewHorizontal.scrollTo({x:-(index+1)*100+(index*240)})}
                            key={index}>
                            <Text style={style.menuTitle}>
                                {cat.type}
                            </Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
                </View>
                <View style={style.contentContainer}>
                    <ScrollView
                        contentContainerStyle={style.scrollContainer}
                        style={{paddingTop:10}}
                        ref={(scrollView) => { _scrollView = scrollView; }}
                        automaticallyAdjustContentInsets={true}>
                        {this.state.selectedNewsIndex == -1 ?
                          <NewsList data={this.props.data} select={(e,x)=>this.setState({selectedNewsIndex:e,selectedNewsData:x},()=>console.log(e))} />
                            :
                            <SelectedNews selection={this.state.selectedNewsData}
                                          goBack={()=>this.setState({selectedNewsIndex:-1})}
                            />
                        }
                    </ScrollView>
                </View>
                <View style={style.tabBar}>
                <TabBarIOS>
                    <TabBarIOS.Item
                        title="Blue Tab"
                        icon={{uri: base64Icon, scale: 3}}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {this.setState({selectedTab: 'blueTab',});}}>
                        <LeftNav />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        title="Red Tab"
                        icon={{uri: base64Icon, scale: 3}}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {this.setState({selectedTab: 'redTab',});}}>
                        <LeftNav />
                    </TabBarIOS.Item>
                </TabBarIOS>
                </View>
            </View>
        )
    }
}

//export default connect(state => ({data: state && state.data && state.data.data}), {fetchData})(App)

const style = {
    container:{
        paddingTop:30,
        backgroundColor:"white",
        flex:1,
    },
    tabBar:{
      height:50,
    },
    contentContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    menuContent: {
        alignItems: "center",
        justifyContent: "center",
    },
    wrapperSnap:{
      width:500,
    },
    menu: {
        padding:10,
        backgroundColor: "white",
    },

    menuTitle: {
        marginTop:5,
        marginLeft: 50,
        marginRight: 50,
        color: "red",
    },
    snap: {
        marginTop: 10,
        height: 360,
        alignItems: "center",
        backgroundColor: "white",
    },
    scrollContainer: {
        alignItems: "center",
    },
};