import React, {FC,useState} from 'react';
import {LocationSearch} from './locationSearch';
import {LocationsTable} from './locationsTable'
import {WeatherLocation} from '../model/Weather'
import {searchLocation} from '../services/WeatherService'
import {WeatherSummary} from './WeatherSummary'
import 'bootstrap/dist/css/bootstrap.min.css';

const App:FC = ()=> {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);

  const resetAlert = ()=>{
    setError('')
    setWarning('')
  }

  const addLocation = async (term: string)=>{

    resetAlert()

    const location = await searchLocation(term)

    if (!location) {
      setError(`sorry, no location found called ${term}`)
    }else if (locations.find(item=> item.id === location.id)) {
      setWarning(`Location '${term}' is in the list `)
    }else {
      setLocations([location, ...locations])
    }
  };


  return (
    <div className="container"  >
     <h1>Weather App</h1>

     <LocationSearch onSearch={addLocation} />
     {
        error
          ? <div className={`alert alert-danger`}>{error}</div>
          : null
      }
      {
        warning
          ? <div className={`alert alert-warning`}>{warning}</div>
          : null
      }
     <LocationsTable locations={locations} 
                current={currentLocation}
                onSelect={location => setCurrentLocation(location)}
     />
     <WeatherSummary location={currentLocation}/>
    </div>
  );
}

export default App;
