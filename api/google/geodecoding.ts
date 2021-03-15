import axios from "axios";
import cache from "../../cache";
import apiSecret from "./apiSecret";

const GeoDecoding = async (lat: string, lng: string) => {
    try {
        const cacheKey = `${lat}-${lng}-geocoding`;
        let response: any;
        if (cache.has(cacheKey)) {
            response = cache.get(cacheKey)!
        }
        else
        {
            const apiResponse = await axios.request({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                params: {
                    key: apiSecret,
                    result_type: 'political',
                    location_type: 'APPROXIMATE',
                    latlng: `${lat},${lng}`
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

export default GeoDecoding
