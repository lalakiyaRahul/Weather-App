import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import MapView, { Marker, MAP_TYPES, PROVIDER_DEFAULT, } from 'react-native-maps';

export default class WeatherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon:''
    };
  }

  get mapType() {
    // MapKit does not support 'none' as a base map
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
  }

  componentDidMount() {
    var res = this.props.route.params.selectedItem.weather[0].icon
    this.setState({icon:res})

  }

  render() {
    return (
      <View>
        <View style={{ padding: 8 }}>
          <MapView
            // mapType={this.mapType}
            style={{ height: 400, width: '100%', borderRadius: 8, marginTop: 10 }}
            initialRegion={{
              latitude: this.props.route.params.selectedItem.coord.lat,
              longitude: this.props.route.params.selectedItem.coord.lon,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
            customMapStyle={mapStyle}>
            <Marker
              coordinate={{
                latitude: this.props.route.params.selectedItem.coord.lat,
                longitude: this.props.route.params.selectedItem.coord.lon,
              }}
            />
          </MapView>
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column',padding:10 }}>
              <Text style={{fontSize: 25,fontWeight:'bold'}}>{this.props.route.params.selectedItem.name}</Text>
              <Text>{this.props.route.params.selectedItem.weather[0].description}</Text>
              <View style={{flexDirection:'row'}}>
              <Text>Humidity : </Text>
              <Text>{this.props.route.params.selectedItem.main.humidity}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text>Wind Speed : </Text>
              <Text>{this.props.route.params.selectedItem.main.humidity}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text>Max. Temp : </Text>
              <Text>{this.props.route.params.selectedItem.main.temp_max}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text>Min. Temp : </Text>
              <Text>{this.props.route.params.selectedItem.main.temp_min}</Text>
              </View>
            </View>
            <View style={{ alignItems:'center',padding:10 }}>
            <Text style={{fontSize:40}}>{this.props.route.params.selectedItem.wind.deg}</Text>
              <Image
              style={{height:100,width:100}}
              source={{uri: 
                'http://openweathermap.org/img/w/03d.png'}}
              />
              
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
]
