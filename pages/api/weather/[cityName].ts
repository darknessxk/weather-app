import { NextApiRequest, NextApiResponse } from 'next'
import Weather from "../../../api/open-weather/weather";

export default async function weatherHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { cityName, langCode },
        method,
    } = req

    switch (method) {
        case 'GET':
            const result = await Weather(cityName.toString(), langCode.toString());
            res.status(result.status).json(result.data);
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
