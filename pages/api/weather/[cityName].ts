import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import NodeCache from 'node-cache'

const cache = new NodeCache({
    stdTTL: 20,
    checkperiod: 120
})

export default async function weatherHandler(req: NextApiRequest, res: NextApiResponse) {
    const apiSecret = process.env.WEATHER_API;

    const {
        query: { cityName, langCode },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            try {
                const cacheKey = `${cityName}-${langCode}`;
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
                            lang: langCode || 'en'
                        }
                    });

                    const response = apiResponse.data;

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
