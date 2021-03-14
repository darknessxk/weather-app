import axios from "axios";

export default async (ip: string) => await axios.request({
    url: `http://ip-api.com/json/${ip}`,
    method: 'GET'
});
