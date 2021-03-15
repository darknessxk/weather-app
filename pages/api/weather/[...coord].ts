import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import NodeCache from 'node-cache'

const cache = new NodeCache({
    stdTTL: 120,
    deleteOnExpire: true,
    checkperiod: 120,

})

export default async function weatherHandler(req: NextApiRequest, res: NextApiResponse) {
    const apiSecret = process.env.WEATHER_API;

    const {
        query: { latLong, langCode },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            try {
                const latLng = latLong.slice(',');
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
                        url: 'https://api.openweathermap.org/data/2.5/onecall',
                        params: {
                            appid: apiSecret,
                            units: 'metric',
                            lang: langCode,
                            lat: '-23.6376',
                            lon: '-46.6295',
                            exclude: 'minutely,hourly'
                        }
                    });

                    response = apiResponse.data;

                    cache.set(cacheKey, response);
                }

                res.status(200).json(response);
            } catch (e) {
                res.status(500).json(e);
            }

            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
