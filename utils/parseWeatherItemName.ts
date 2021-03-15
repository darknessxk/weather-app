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
            return ["Time", value];
        case "sunrise":
            return ["Sunrise", value];
        case "sunset":
            return ["Sunset", value];
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
            return ["Clouds", value];
        case "visibility":
            return ["Visibility", value];
        case "wind_speed":
            return ["Wind Speed", textFormat(value, "kmh")];
        case "wind_deg":
            return ["Wind Direction", textFormat(value, "deg")];
        case "weather":
            return ["Weather", "..."];
        default:
            return [`(unk)${name}`, value]
    }
}

export default parseWeatherItemName;
