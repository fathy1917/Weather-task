let todayName = document.getElementById("today-name")
let todayNumber = document.getElementById("today-data")
let todayDataMonth = document.getElementById("today-data-month")
let todayLocation = document.getElementById("today-loctaion")
let todayTemp = document.getElementById("today-temp")
let todayImg = document.getElementById("today-img")
let todayText = document.getElementById("today-text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDiraction = document.getElementById("wind-diraction")

let nextDayName = document.getElementsByClassName("next-day-name")
let nextDayImg = document.getElementsByClassName("next-day-name")
let nextDayMaxTemp = document.getElementsByClassName("next-day-max-temp")
let nextDayMinTemp = document.getElementsByClassName("next-day-min-temp")
let nextDayText = document.getElementsByClassName("next-day-text")

let search = document.getElementById("search")
async function getData (city){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f9d461953ad04c879b753010241307&q=07112${city}&days=3`);
    let weatherData = await weatherResponse.json()
    return weatherData;
}

function displayToday(data){
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c+`<sup>o</sup>C`
    todayImg.setAttribute("src", data.current.condition.icon);
    todayText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph
    windDiraction.innerHTML = data.current.wind_dir+"km/h"
    let todayData = new Date(); 
    todayName.innerHTML = todayData.toLocaleDateString("en-US", { weekday: "long" });
    todayDataMonth.innerHTML = todayData.toLocaleDateString("en-Us", { month: "long"})
    todayNumber.innerHTML = todayData.getDate();
}


function displayNextDay(data){
    let forcast = data.forecast.forecastday
    for(var i = 0; i < 2; i++){
        nextDayMaxTemp[i].innerHTML = forcast[i+1].day.maxtemp_c
        nextDayMinTemp[i].innerHTML = forcast[i+1].day.mintemp_c
        nextDayImg[i].setAttribute("src" , forcast[i+1].day.condition.icon)
        nextDayText[i].innerHTML = forcast[i+1].day.condition.text
        let nextDate = new Date(forcast[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
    }
}

async function call(city="cairo"){
    let weatherData = await getData(city);
    
        displayToday(weatherData);
        displayNextDay(weatherData)

}

call()

search.addEventListener("input", function(word){
    let cityName = search.value
    call(cityName)
})
