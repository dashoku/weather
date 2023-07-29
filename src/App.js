import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//  import "bootswatch/journal/bootstrap.css";
//import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Київ", zip: "Kyiv" },
  { name: "Одеса", zip: "Odesa" },
  { name: "Тернопіль", zip: "Ternopil" },
  { name: "Івано-Франківськ", zip: "Ivano-Frankivsk" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div class="weather_info">
        <table align="center">
          <tr>
          <th colspan="2" class = "main_row" align="center">
            <h1>
            <span id="h_weather">
            {weather.main} in {weatherData.name}
            <img src={iconUrl} alt={weatherData.description} />
            </span>
            </h1>
          </th>
          </tr>
        <tr><td id="text">Вітер: </td><td>{weatherData.wind.speed} км/год</td></tr>
        <tr><td id="text">Температура зараз:</td> <td>{weatherData.main.temp}°</td></tr>
        <tr><td id="text">Температура макс.: </td><td>{weatherData.main.temp_max}°</td></tr>
        <tr><td id="text">Температура мін.: </td><td>{weatherData.main.temp_min}°</td></tr>
        
        </table>
      </div>
    );
  }
}
function City()
{
  return <h2>{"Оберіть Місто"}</h2>;
}

function Me()
{
  return <code>{"Ричкова Дар'я К20.1"}</code>; 
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div class = "AllApp">
      <div className="App">
        <div>
        <span id="h_weather"><City/></span>
          <ul class = "list" type = "none">
            {PLACES.map((place, index)=>(
            <li>
              <button class = "buttons" key = {index} onClick = {() => {this.setState({activePlace: index});}}>
              {place.name}
              </button>
            </li>))}
          </ul>
        </div>
        <WeatherDisplay key = {activePlace} zip = {PLACES[activePlace].zip}/>
        </div>
        <Me/>
        </div>
    );
  }
}

export default App;