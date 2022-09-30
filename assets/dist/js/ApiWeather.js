let timeZ = undefined;
let degree;
let descriptionTypeOfDegree = document.getElementById("typeOfDegree");
let showDegree = document.getElementById("degree");

let responceLocition = async () => {
    let theLocition = "http://ip-api.com/json/24.48.0.1?fields=country,regionName,city,lat,lon,timezone";
    let response = await fetch(theLocition);
    return response.json();
}

let responceWeather = async (lat, lon) => {
    let theWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=99bbfea75acbaffa1da8a5b5e2924cda`;
    let response = await fetch(theWeather);
    return response.json();
}

responceLocition().then(getMap => {
    document.getElementById("getLocation").innerText = getMap.timezone;
    timeZ = getMap.city;
    return responceWeather(getMap.lat, getMap.lon)
}).then(getWea => {
    let responceWeather = getWea.weather[0].main;
    let descriptionWeather = getWea.weather[0].description;
    window.mainTemp = getWea.main.temp;

    let myIcon = `<img width="300" src="assets/img/${getIcon(responceWeather)}">`;
    let myDescription = `<p class="fw-normal">in the ${timeZ} weather is ${descriptionWeather}</p>`

    degree = getWeatherCalc(mainTemp);

    descriptionTypeOfDegree.innerText = "F";
    showDegree.innerText = degree.far;

    document.getElementById("parentImg").innerHTML = myIcon + myDescription;
})

let button = document.getElementById("deg")

button.addEventListener("click", function () {

    console.log(descriptionTypeOfDegree + "  >>>  " + showDegree)

    if (descriptionTypeOfDegree.textContent == "F") {

        showDegree.textContent = getWeatherCalc(window.mainTemp).kel;
        descriptionTypeOfDegree.textContent = "K";

    } else if (descriptionTypeOfDegree.textContent == "K") {

        showDegree.textContent = getWeatherCalc(window.mainTemp).can;
        descriptionTypeOfDegree.textContent = "C";

    } else if (descriptionTypeOfDegree.textContent == "C") {

        showDegree.textContent = getWeatherCalc(window.mainTemp).far;
        descriptionTypeOfDegree.textContent = "F";

        document.getElementById("alert").style.display = "none";
    }
})

let getWeatherCalc = (weather) => {
    let k = weather;
    let f = (k - 273.15) * 9 / 5 + 32;
    let c = (k - 273.15)
    return {kel: Math.floor(k), far: Math.floor(f), can: Math.floor(c)}
}

let getIcon = (responceWeather) => {
    let icon;
    switch (responceWeather) {
        case "Blizzards":
            icon = `${responceWeather}.png`
            break;
        case "Typhoons":
            icon = `${responceWeather}.png`
            break;
        case "Hurricanes":
            icon = `${responceWeather}.png`
            break;
        case "Tornadoes":
            icon = `${responceWeather}.png`
            break;
        case "Thunderstorms":
            icon = `${responceWeather}.png`
            break;
        case "Drizzle":
            icon = `${responceWeather}.png`
            break;
        case "Rani":
            icon = `${responceWeather}.png`
            break;
        case "Clouds":
            icon = `${responceWeather}.png`
            break;
        case "Atmosphere":
            icon = `${responceWeather}.png`
            break;
        case "Snow":
            icon = `${responceWeather}.png`
            break;
        case "Cyclone":
            icon = `${responceWeather}.png`
            break;
        case "Sunny":
            icon = `${responceWeather}.png`
            break;
        case "Windy":
            icon = `${responceWeather}.png`
            break;
        case "Tornado":
            icon = `${responceWeather}.png`
            break;
        case "Temperature":
            icon = `${responceWeather}.png`
            break;
        case "Drought":
            icon = `${responceWeather}.png`
            break;
        case "Clear":
            let result = getDayOrNight();
            icon = `${responceWeather}-${result}.png`
            break;
    }
    return icon;
}

let getDayOrNight = () => {
    let date = new Date();
    if (date.getHours() >= 6 && date.getHours() <= 19) {
        return "day";
    } else if (date.getHours() > 19 && date.getHours() <= 24) {
        return "night";
    }
}