import axios from "axios";
import cache from "../../../cache";
import apiSecret from "./secret";
import {OneCallResponse} from "./onecallresponse.type";

const OneCall = async (lat: Number | string, lng: Number | string, langCode?: string) => {
    try {
        const currentLang = langCode || 'en';
        const cacheKey = `${lat}-${lng}-${currentLang}`;
        let response: OneCallResponse;
        if (cache.has(cacheKey)) {
            response = cache.get(cacheKey)!
        }
        else
        {
            const apiResponse = await axios.request({
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/onecall',
                params: {
                    appid: apiSecret,
                    units: 'metric',
                    lang: langCode,
                    lat: lat,
                    lon: lng,
                    exclude: 'minutely,hourly,daily'
                }
            });

            response = apiResponse.data;

            cache.set(cacheKey, response);
        }

        return { status: 200, data: response };
    } catch (e) {
        console.error('Api Error (OneCall)', e)
        return { status: 500, data: e };
    }
}

export default OneCall;
