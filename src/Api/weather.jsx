import axios from "axios"
import { useEffect , useState } from "react"
const WeatherApi=()=>{
    const[inputValue , SetInputValue] = useState("")
    const[weatherInfo , SetWeatherInfo] = useState("")
    const[error , SetError] = useState(false)
    const[apiCall , SetApiCall] = useState(false)
    

    useEffect(()=>{
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${inputValue ? inputValue : "karachi"}&appid=307dd2a570c82a15dd31ff99da502619&units=metric`

        )
        .then((respond)=>{
            SetWeatherInfo(respond.data)
            SetError(false)
    console.log(respond.data)

        })
        .catch((err)=>{
            SetError(true)
            console.log(err)
        })
    } , [apiCall])
    const stopReset =(e)=>{
        e.preventDefault()
        console.log(inputValue)
        if(!inputValue){
            alert("Please Enter City Name")
        }
        SetApiCall(!apiCall)

    };
    return(
        <div>
            <section className="InputField">
                <form onSubmit={stopReset} >
                <input type="text"
                onChange={(e)=>{SetInputValue(e.target.value)}}
                placeholder="Enter City Name"
                value={inputValue} 
                />
                
                </form>
                
            </section>
            {error === false ?(
                <section className="weatherinfo">
                    <div>   
                        <h2>{weatherInfo.name}</h2>
                            <h3>Sky :{weatherInfo ? weatherInfo.main.temp :"Temprature"}</h3>
                    <div>
                        <h5>{weatherInfo ? weatherInfo.weather[0].main : "Weather"}</h5>
                            <p className="min-temp">
                               Minimum Temprature : {weatherInfo ? weatherInfo.main.temp_min : "temp min"}
                            </p>
                            <p>Maximum Temprature : {weatherInfo ? weatherInfo.main.temp_max : "temp max"}</p>

                    </div>
                        
                    </div>

                </section>
            ):(
                <h2>No City With This Name</h2>
            )}
        </div>
    )

    

}

export default WeatherApi ;