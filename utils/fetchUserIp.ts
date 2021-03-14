import axios from "axios";

export default async () => await axios.request({
    url: 'https://api.my-ip.io/ip.json',
    method: 'GET'
});
