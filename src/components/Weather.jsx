import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  function KelvinToCelcius(Kelvin) {
    return Math.floor(Kelvin - 273.15);
  }
  async function FetchWeather() {
    const apiKey = "82e0bfc830f75ad67cb166ebeabc99a7";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey;
    const res = await fetch(url, { origin: "cors" });
    const data = await res.json();
    // console.log(data);
    const weather = document.createElement("div");
    weather.classList.add("weather");
    const temperature = KelvinToCelcius(data.main.temp);
    weather.innerHTML = `<h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
      ${temperature}° C
       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
      </h2>
      <small>${data.weather[0].main}</small>
      `;
    const main = document.getElementById("weatherReport");
    main.innerHTML = "";
    main.appendChild(weather);
    main.style.visibility = "visible";
  }
  return (
    <>
      <div className="wrapper">
        <div className="input-group mb-3 InputHolder">
          <input
            type="text"
            className="form-control"
            aria-label="city"
            aria-describedby="city"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
          />
        </div>
        <button type="button" class="btn btn-primary" onClick={FetchWeather}>
          Get Weather Report
        </button>
        <div id="weatherReport"></div>
      </div>
    </>
  );
}

export default Weather;
