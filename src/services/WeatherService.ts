import {WeatherLocation,Weather} from '../model/Weather'
import {keyQuery} from './ts'


// const key:string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string 

// if (key === undefined) {
//     throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
// }
 
const server = `http://api.openweathermap.org/data/2.5`


export async function searchLocation (term:string): Promise<WeatherLocation | undefined> {
    const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`)

    if (result.status === 404) return undefined;
    if (result.status !== 200) throw new Error('failed to read location data, please check input')

    return await result.json();
}

export async function readWeather (locationId:number): Promise<Weather> {
    const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`)
   
    if (current.status !== 200) throw new Error('failed to read location data')

    return await current.json();
}

export const getIconUrl = (code:string):string=>{
    return `http://openweathermap.org/img/wn/${code}.png`;
}

export async function readForcast(locationId:number):Promise<Weather[]> {
 const forcast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`)

 if(forcast.status !== 200) throw new Error('failed to read location data')
    return (await forcast.json()).list;
}
