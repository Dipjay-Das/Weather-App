const container = document.querySelector(".container1");
const bodyPart = document.querySelector("body")
const inputPart = container.querySelector(".input-part");
const textInfo = inputPart.querySelector(".text-info");
const inputSection = inputPart.querySelector("input");
const getLocation = inputPart.querySelector("button");
const weatherImage = document.querySelector(".weather-info img");
const arrowPart = document.querySelector("header i");

inputSection.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputSection.value != "") {
        requestApi(inputSection.value);
    }
});

getLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
})

let api;
const apiKey2 = "b14081f7793c4472fed4397d112e3e42";
function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey2}`;
    fetchDetails();
}

function onError(error) {
    textInfo.textContent = error.message;
    textInfo.classList.add("error");
}

const apiKey1 = "b14081f7793c4472fed4397d112e3e42";
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&units=metric&appid=${apiKey1}`;
    fetchDetails();
}

function fetchDetails() {
    textInfo.textContent = "Getting weather details...";
    textInfo.classList.add("valid");
    fetch(api).then(response => response.json()).then(result => weatherInfo(result));
}

function weatherInfo(info) {
    textInfo.classList.replace("valid", "error");
    if (info.cod == "404") {
        textInfo.textContent = `${inputSection.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { feels_like, humidity, temp } = info.main;
        const { description, id } = info.weather[0];

        if (id == 800) {
            weatherImage.src = "Weather Icons/clear.svg";
        } else if (id >= 200 && id <= 232) {
            weatherImage.src = "Weather Icons/storm.svg";
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            weatherImage.src = "Weather Icons/rain.svg";
        } else if (id >= 600 && id <= 622) {
            weatherImage.src = "Weather Icons/snow.svg";
        } else if (id >= 700 && id <= 781) {
            weatherImage.src = "Weather Icons/storm.svg";
        } else if (id >= 800 && id <= 804) {
            weatherImage.src = "Weather Icons/cloud.svg";
        }

        container.querySelector(".temp").textContent = Math.floor(temp);
        container.querySelector(".details .temperature .temp").textContent = Math.floor(feels_like);
        container.querySelector(".weath").textContent = description;
        container.querySelector(".location span").textContent = `${city}, ${country}`;
        container.querySelector(".humidity span").textContent = `${humidity}%`;

        textInfo.classList.remove("valid", "error");
        bodyPart.style.backgroundImage = "url('y2.jpg')";
        bodyPart.style.alignItems = "flex-start";
        container.classList.add("active");
    }
    console.log(info)
}

 arrowPart.addEventListener("click", ()=>{
    container.classList.remove("active");
    bodyPart.style.backgroundImage = "url('g.jpg')";
    bodyPart.style.alignItems = "center";
 })
