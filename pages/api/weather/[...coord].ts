import { NextApiRequest, NextApiResponse } from 'next'
import OneCall from "../../../api/open-weather/onecall";

export default async function weatherHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { coord },
        method,
    } = req

    switch (method) {
        case 'GET':
            const result = await OneCall(coord[0], coord[1], (coord[2] || "en"));
            res.status(result.status).json(result.data);
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
