import textFormat from "./textFormat";

const parseWeatherItemName = (name: string, value: string | number) => {
    switch (name) {
        case "lat":
            return ["Latitude", value];
        case "lon":
            return ["Longitude", value];
        case "timezone":
            return ["Timezone", value];
        case "timezone_offset":
            return ["Timezone Offset", value as number / 60 / 60];
        case "current":
            return ["Current", "..."];
        case "alerts":
            return ["Alerts", "..."];
        case "dt":
            return ["Time", textFormat(value, "hours")];
        case "sunrise":
            return ["Sunrise", textFormat(value, "hours")];
        case "sunset":
            return ["Sunset", textFormat(value, "hours")];
        case "temp":
            return ["Temperature", textFormat(value, "deg")];
        case "feels_like":
            return ["Feels like", textFormat(value, "deg")];
        case "pressure":
            return ["Air Pressure", `${value} hPa`];
        case "humidity":
            return ["Air Humidity", textFormat(value, "percentage")];
        case "dew_point":
            return ["Dew Point", textFormat(value, "deg")];
        case "uvi":
            return ["UV Index", value];
        case "clouds":
            return ["Clouds", textFormat(value, "percentage")];
        case "visibility":
            return ["Visibility", textFormat(value, "meters")];
        case "wind_speed":
            return ["Wind Speed", textFormat(value, "kmh")];
        case "wind_gust":
            return ["Wind Gust", textFormat(value, "meters/s")];
        case "wind_deg":
            return ["Wind Direction", textFormat(value, "deg")];
        case "weather":
            return ["Weather", "..."];
        default:
            return [`(unk)${name}`, value]
    }
}

export default parseWeatherItemName;
