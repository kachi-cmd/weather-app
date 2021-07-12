import {FC, useEffect, useState} from 'react'
import {WeatherEntry} from './WeatherEntry'
import {WeatherLocation, Weather} from '../model/Weather'
import {readForcast, readWeather} from '../services/WeatherService'
import './WeatherSummary.scss'


interface WeatherSummaryProp {
    location : WeatherLocation | null
}

export const WeatherSummary:FC<WeatherSummaryProp> = ({location})=>{
  const [weather, setWeather ] = useState<Weather | null>(null)
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(()=>{
   (
       async function () {
           if (location) {
               const [weather, forecast] = await Promise.all([
                   readWeather(location.id), readForcast(location.id)
               ]);
               setWeather(weather)
               setForecast(forecast) 
           }
       }
   )()
  },[location])

  if (!location || !weather || !forecast) return null
    return(
        <>
         <hr/>
         <h2>{location.name}</h2>
         <WeatherEntry weather={weather}  />

         <h2>Forecast</h2>
      <div>
        <ol>
          {forecast.map(timePoint =>
            <li key={timePoint.dt}>
              <WeatherEntry weather={timePoint}/>
            </li>
          )}
        </ol>
      </div>
        </>
    )
}