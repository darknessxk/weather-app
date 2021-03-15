import axios from "axios";
import cache from "../../../cache";
import apiSecret from "./secret";

const Weather = async (cityName: string, langCode?: string) => {
    try {
        const currentLang = langCode || 'en';
        const cacheKey = `${cityName}-${currentLang}`;
        let response: any;
        if (cache.has(cacheKey)) {
            response = cache.get(cacheKey)
        }
        else
        {
            const apiResponse = await axios.request({
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    appid: apiSecret,
                    q: cityName,
                    units: 'metric',
                    lang: currentLang
                }
            });

            response = apiResponse.data;

            cache.set(cacheKey, response);
        }

        return { status: 200, data: response };
    } catch (e) {
        console.error('Api Error (Weather)', e)
        return { status: 500, data: e };
    }
}

export default Weather;
