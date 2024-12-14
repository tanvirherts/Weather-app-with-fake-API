const emptyInput = document.getElementById("empty-input");
const searchBtn = document.getElementById("search-button");

document.querySelector("#search-city").addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        searchBtn.click();
    }
});

const searchButton = () => {
    const searchInput = document.querySelector("#search-city");
    const cityName = searchInput.value;
    emptyInput.textContent = "";
    if(cityName === "") {
        emptyInput.innerHTML = `
        <h4 class = "text start text-danger mt-2"> Please enter a city name to search...</h4>
        `;
    }
    //Clear search
    searchInput.value = "";
    loadSearch(cityName);
};

const loadSearch = async (city) => {
    const api = "82ab3b9966d7de1b8bbcfab43ab72df1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
};

const displayWeather = (temperature) => {
    if(temperature.message === "city not found") {
        emptyInput.innerHTML = `<h4 class="text-start text-danger mt-2">No results found!</h4>`;
    }
    const container = document.getElementById("container");
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(temperature.dt);
    const sunriseTime = convertUnixTimeToLocal(temperature.sys.sunrise);
    const sunsetTime = convertUnixTimeToLocal(temperature.sys.sunset);
    const div = document.createElement("div");
    div.innerHTML = `
    <h4 class="fs-2">${temperature.name}, ${temperature.sys.country}</h4>
    <h6>${localDate.fullDate}</h6>
    <img src="https://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png" alt="">
    <h5 class=fs-1>${temperature.main.temp} &deg;C</h5>
    <h5><span class="me-3">Sunrise: ${sunriseTime.time12h}</span> &<span class="ms-3">Sunset: ${sunsetTime.time12h}</span></h5>
    `;
    container.appendChild(div);
};

loadSearch("London");

const convertUnixTimeToLocal = (unixTime) => {
    const milliSeconds = unixTime *1000;
    const humanDateFormat = new Date(milliSeconds);
    const convertedTimeObject = {
        fullDate: humanDateFormat.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
        time12h: humanDateFormat.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }),
    };
    return convertedTimeObject;
};