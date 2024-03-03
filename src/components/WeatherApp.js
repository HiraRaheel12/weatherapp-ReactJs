import React, {useState, useEffect} from 'react'

import background from '../images/backgroundImage.jpg'
import sunnybackground from '../images/sunnybackground.jpg'
import rainybackground from '../images/rainybackground.jpg'
import sunrise from '../images/sunriseIcon.png'
import sunset from '../images/sunsetIcon.png'
import airIcon from '../images/airIcon.png'
import humidity from '../images/humidityIcon.png'
import precipitation from '../images/precipitationIcon.png'
import pressure from '../images/pressureIcon.png'
import cloudyweather from '../images/cloudyweather.png'
import hazeweather from '../images/hazeweather.png'
import rainyweather from '../images/rainyweather.png'
import clearsky from '../images/clearsky.png'
import thunderstorm from '../images/thunderstormweather.png'
import drizzle from '../images/drizzle.png'
import mist from '../images/mist.png'
import defaultimage from '../images/defaultweather.png'


function WeatherApp() {
    const[searchValue, setSearchValue] = useState("Karachi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e5fca09a6a8989e4ce21fc08c756f5e8`;
  
        let res = await fetch(url);
        let data = await res.json();
  
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { "1h": rain } = data.rain || {}; 
        const { country, sunrise, sunset } = data.sys;

        //Convert Speed to Km/h
        const speedKmPerhour = Math.round(speed * 3.06)

        //Convert Time to 12-Hour fomrat

        function convertTo12HourFormat(sec) {
          let date = new Date(sec * 1000);
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          return `${hours}:${minutes} ${ampm}`;
        }
      
      let timeStrSunrise = convertTo12HourFormat(sunrise);
      let timeStrSunset = convertTo12HourFormat(sunset);
    

        const myNewWeatherInfo = { 
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed: speedKmPerhour,
          rain,
          country,
          sunrise : timeStrSunrise,
          sunset : timeStrSunset
        };
  
        setTempInfo(myNewWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getWeatherInfo();
    },[]);

    const backgroundImage = (weathermood) => {
      switch(weathermood) {
          case 'Rain':
              return <img src={rainybackground} alt='rainIcon' />;
          case 'Thunderstorm':
              return <img src={rainybackground} alt='thunderstormIcon' />;
          case 'Clear':
              return <img src={sunnybackground} alt='clearsky' />;
          case 'Drizzle':
              return <img src={rainybackground} alt='drizzleicon' />;
          default:
              return <img src={background} alt='defaultIcon' />; // Provide a default image
      }
  };

    const renderWeatherIcon = (weathermood) => {
      switch(weathermood) {
          case 'Clouds':
              return <img src={cloudyweather} alt='cloudyIcon' />;
          case 'Haze':
              return <img src={hazeweather} alt='hazeIcon' />;
          case 'Rain':
              return <img src={rainyweather} alt='rainIcon' />;
          case 'Thunderstorm':
              return <img src={thunderstorm} alt='thunderstormIcon' />;
          case 'Clear':
              return <img src={clearsky} alt='clearsky' />;
          case 'Drizzle':
              return <img src={drizzle} alt='drizzleicon' />;
          case 'Mist':
              return <img src={mist} alt='misticon' />;
          default:
              return <img src={defaultimage} alt='defaultIcon' />; // Provide a default image
      }
  };

    return (
      <div className="App">

        {backgroundImage(tempInfo.weathermood)}
       
        <div className='background'>
      

            <div className='box'>
                  {/* Search Box */}
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' 
                    value= {searchValue} onChange={ (e) => setSearchValue(e.target.value)} ></input>
                    <i className='searchIcon fas fa-search' onClick={getWeatherInfo}></i>
                </div>

                <div className='temperature'>
                {renderWeatherIcon(tempInfo.weathermood)}
                  <h1>{tempInfo.temp}&deg;C</h1>
                  <p>{tempInfo.weathermood}</p>
                </div>

                <div className='weather-details'>
                  <div className='first-row'>
                    <div className='sunrise'>
                        <img src={sunrise} alt='sunrise'></img>
                        <div className='sunriseTime'>
                          <h6>&nbsp; Sunrise</h6>
                          <p>&nbsp; {tempInfo.sunrise}</p>
                        </div>
                     </div>
                     <div className='sunset'>
                        <img src={sunset} alt='sunset'></img>
                        <div className='sunsetTime'>
                          <h6>&nbsp; Sunset</h6>
                          <p>&nbsp; {tempInfo.sunset}</p>
                        </div>
                     </div>
                     <div className='humidity'>
                        <img src={humidity} alt='humidity'></img>
                        <div className='humidityPer'>
                          <h6>&nbsp;Humidity</h6>
                          <p>&nbsp;{tempInfo.humidity}%</p>
                        </div>
                     </div>
                    </div>

                    <div className='second-row'>
                     <div className='air'>
                        <img src={airIcon} alt='air'></img>
                        <div className='airQuality'>
                          <h6>&nbsp;&nbsp;Wind Speed</h6>
                          <p>&nbsp;&nbsp;{tempInfo.speed} km/h</p>
                        </div>
                     </div>
                     <div className='precipitation'>
                        <img src={precipitation} alt='precipitation'></img>
                        <div className='precipitationPer'>
                          <h6>&nbsp;Precipitation</h6>
                          {
                          typeof tempInfo.rain == "undefined" ||  tempInfo.rain == 0 ? (
                          <p>&nbsp;0 mm</p> ) : (
                          <p>&nbsp;{tempInfo.rain} mm</p>
                          )}
                        </div>

                     </div>
                    <div className='pressure'>
                        <img src={pressure} alt='pressure'></img>
                        <div className='pressureValue'>
                          <h6>&nbsp;&nbsp;Pressure</h6>
                          <p>&nbsp;&nbsp;{tempInfo.pressure}hPa</p>
                        </div>
                     </div>
                    </div>
                </div>
            </div>
          
        </div>
      </div>
    );
  }
  
  export default WeatherApp;