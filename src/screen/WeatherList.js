import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {
  GetCountryApi
} from '../Redux/Actions/index';
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';

class WeatherList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: '',
      currentLatitude: '',
    };
  }

  // fetchWeather(lat = 23.68, lon = 90.35) {
  //   fetch(
  //     // `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${'6bfd2bd8f437acf3cfc5311b7a4df231'}&units=metric`
  //     `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&appid=6bfd2bd8f437acf3cfc5311b7a4df231`
  //   )
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json);
  //     });
  // }

  backgroudProcess = async ()  => {
    const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

    this.options = {
      taskName: 'WeatherApp',
      taskTitle: 'Current Temparature: 20',
      // taskTitle: 'Current Temparature:' `${this.props.GetCountryData.wind.deg}`,
      taskDesc: '',
      taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
      },
      // color: Colors.MainColor,
      parameters: {
          delay: 1000,
      },
      actions: '["Exit"]'
  };

    const veryIntensiveTask = async (taskDataArguments) => {
      // Example of an infinite loop task
      const { delay } = taskDataArguments;
      await new Promise( async (resolve) => {
          for (let i = 0; BackgroundService.isRunning(); i++) {
              await sleep(delay);
          }
      });
  };
  await BackgroundService.start(veryIntensiveTask, this.options);
  
  }

  apicall() {
    let lati = this.state.currentLatitude
    let longi = this.state.currentLongitude
    this.props.GetCountryApi(longi, lati)
  }

  componentDidUpdate = (prevProps, prevState) => {
    prevState.currentLatitude !== this.state.currentLatitude && this.apicall();
  };

  componentDidMount() {
    this.backgroudProcess();
    let lati = this.state.currentLatitude
    let longi = this.state.currentLongitude
    this.getCurrentPosition();
    this.subscribeLocationLocation();
    this.getOneTimeLocation()
    this.requestLocationPermission()
    this.props.GetCountryApi(longi, lati)
  }

  getCurrentPosition = () => {
    // console.log(this.state.currentLatitude,"currentLatitude")
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        console.log(currentLongitude, currentLatitude, "get current lat-long222222")

      }, (error) => console.log(error.message, "msg"), {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showsBackgroundLocationIndicator: true
    }
    )
    this.subscribeLocationLocation()

  }

  async requestLocationPermission() {
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
      this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // {
          //   title: 'Location Access Required',
          //   message: 'This App needs to Access your location',
          // },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else {
          // // setLocationStatus('Permission Denied');
          // this.setState({ locationStatus: 'Permission Denied' })
          // BackHandler.addEventListener()
          // BackHandler.exitApp();
          // this.props.navigate.navigation.goback()

        }
      } catch (err) {
        // console.warn(err);

      }
    }
  }

  getOneTimeLocation = () => {
    // alert("getOneTimeLocation")
    this.setState({ locationStatus: 'Getting Location ...' })
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        this.setState({ locationStatus: 'You are Here' });

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({ currentLongitude: currentLongitude, currentLatitude: currentLatitude });

      },
      (error) => {
        this.requestLocationPermission()
        // console.warn(error.message);
        //  BackHandler.exitApp();
      },
      {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 1000,
        showsBackgroundLocationIndicator: true
      },
    );
  }

  subscribeLocationLocation = () => {
    // alert("subscribeLocationLocation")
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        // this.setState({ locationStatus: 'You are Here' });
        console.log(position, 'positionAddplace');

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({ currentLongitude: currentLongitude, currentLatitude: currentLatitude });
      },
      (error) => {
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
        showsBackgroundLocationIndicator: true
      },
    );
  }

  render() {
    return (
      <View>
        <FlatList
          refreshing={this.state.isFetching}
          data={this.props.GetCountryData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
               onPress={() => {
                this.props.navigation.navigate('WeatherDetails', { selectedItem: item })}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',padding:5 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text>{item.name}</Text>
                    <Text>{item.weather[0].main}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>{item.wind.deg}</Text>
                  </View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: 'grey', }}></View>
              </TouchableOpacity>
            </View>
          )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state, "mydata====>>>>")
  const GetCountryData = state.WeatherState.GetCountryData
  return {
    GetCountryData
  };
};

export default connect(mapStateToProps, { GetCountryApi })(WeatherList)
