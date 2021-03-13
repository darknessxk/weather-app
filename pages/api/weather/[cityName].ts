import { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

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
                const response = await axios.request({
                    method: 'GET',
                    url: 'https://api.openweathermap.org/data/2.5/weather',
                    params: {
                        appid: apiSecret,
                        q: cityName,
                        units: 'metric',
                        lang: langCode || 'en'
                    }
                });

                res.status(200).json(response.data);
            } catch (e) {
                res.status(500).json(e);
            }

            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
